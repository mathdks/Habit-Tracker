import { Module } from '@nestjs/common';
import { TrackersService } from './trackers.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Tracker } from './entities/tracker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tracker])],
  providers: [TrackersService],
  exports: [TrackersService],
})
export class TrackersModule {}
