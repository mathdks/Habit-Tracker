import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tracker } from './entities/tracker.entity';
import { Repository } from 'typeorm';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class TrackersService {
  constructor(
    @InjectRepository(Tracker)
    private readonly trackerRepository: Repository<Tracker>,
  ) {}

  async record(habit) {
    const trackHabit = new Tracker();

    trackHabit.habit = habit.habitId;

    await this.trackerRepository.save(trackHabit);

    return HttpStatus.OK;
  }

  async verifyIfExistsToday(habit) {
    const selectedTracker = await this.trackerRepository.find({
      order: { createdAt: 'DESC' },
      take: 1,
      relations: { habit: true },
      where: {
        habit: { habitId: habit.habitId },
      },
    });

    if (selectedTracker.shift().createdAt.getDate() === new Date().getDate()) {
      return 'Já existe um registro para esse dia.';
    }

    return await this.record(habit);
  }
}
