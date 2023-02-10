import { Module } from '@nestjs/common';
import { HabitsService } from './habits.service';
import { HabitsController } from './habits.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Habit } from './entities/habit.entity';
import { TrackersModule } from 'src/trackers/trackers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Habit]), TrackersModule],
  controllers: [HabitsController],
  providers: [HabitsService],
})
export class HabitsModule {}
