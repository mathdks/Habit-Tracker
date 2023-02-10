import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Habit } from './entities/habit.entity';
import { Repository } from 'typeorm';
import { calculatePaginationSkip } from 'src/utils/pagination/calculatePaginationSkip';
import { TrackersService } from 'src/trackers/trackers.service';

@Injectable()
export class HabitsService {
  constructor(
    @InjectRepository(Habit)
    private readonly habitRespository: Repository<Habit>,
    private readonly trackerService: TrackersService,
  ) {}

  async create(createHabitDto: CreateHabitDto) {
    const newHabit = new Habit();

    const { title, description, target } = createHabitDto;

    newHabit.title = title;
    newHabit.description = description;
    newHabit.target = target;

    return await this.habitRespository.save(newHabit);
  }

  async findAll(paginationDto) {
    const { orderBy, page, limit } = paginationDto;

    const skip = calculatePaginationSkip(page, limit);

    const habitsList = await this.habitRespository.find({
      order: { title: orderBy },
      take: limit,
      skip,
    });

    return habitsList;
  }

  async findOne(habitId: string) {
    const selectedHabit = await this.habitRespository.findOneBy({ habitId });

    if (selectedHabit) {
      return selectedHabit;
    }

    throw new HttpException(
      'Esse hábito não foi encontrado.',
      HttpStatus.NOT_FOUND,
    );
  }

  async update(habitId: string, updateHabitDto: UpdateHabitDto) {
    const selectedHabit = await this.findOne(habitId);

    const { title, description } = updateHabitDto;

    selectedHabit.title = title;
    selectedHabit.description = description;

    return await this.habitRespository.save(selectedHabit);
  }

  async softDelete(habitId: string) {
    const selectedHabit = await this.findOne(habitId);

    return await this.habitRespository.softDelete(selectedHabit.id);
  }

  async markAsDone(habitId) {
    const selectedHabit = await this.findOne(habitId);

    return await this.createNewTracker(selectedHabit);
  }

  private async createNewTracker(selectedHabit) {
    const recordTracker = await this.trackerService.verifyIfExistsToday(
      selectedHabit,
    );

    return await this.habitAndTrackerTreatment(selectedHabit, recordTracker);
  }

  private async habitAndTrackerTreatment(selectedHabit, recordTracker) {
    if (recordTracker === 200) {
      return await this.addOneTrackerToCount(selectedHabit);
    }

    return recordTracker;
  }

  private async addOneTrackerToCount(selectedHabit) {
    selectedHabit.count++;

    await this.habitRespository.save(selectedHabit);

    return await this.verifyIfHabitIsFinished(selectedHabit);
  }

  private async verifyIfHabitIsFinished(selectedHabit) {
    if (selectedHabit.count === selectedHabit.target) {
      return await this.markHabitAsFinished(selectedHabit);
    }

    return 'Marcação feita com sucesso.';
  }

  private async markHabitAsFinished(selectedHabit) {
    selectedHabit.isFinished = true;

    await this.habitRespository.save(selectedHabit);

    return 'Hábito concluído com sucesso.';
  }
}
