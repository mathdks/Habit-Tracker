import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { HabitsService } from './habits.service';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { PaginationDto } from 'src/utils/pagination/pagination.dto';

@Controller('habits')
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @Post('/create')
  create(@Body() createHabitDto: CreateHabitDto) {
    try {
      return this.habitsService.create(createHabitDto);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    try {
      return this.habitsService.findAll(paginationDto);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get(':habitId')
  findOne(@Param('habitId') habitId: string) {
    try {
      return this.habitsService.findOne(habitId);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Patch(':habitId')
  update(
    @Param('/update/:habitId') habitId: string,
    @Body() updateHabitDto: UpdateHabitDto,
  ) {
    try {
      return this.habitsService.update(habitId, updateHabitDto);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Delete('/delete/:habitId')
  remove(@Param('habitId') habitId: string) {
    try {
      return this.habitsService.softDelete(habitId);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Patch('/mark-as-done/:habitId')
  markAsDone(@Param('habitId') habitId: string) {
    try {
      return this.habitsService.markAsDone(habitId);
    } catch (error) {
      throw new Error(error);
    }
  }
}
