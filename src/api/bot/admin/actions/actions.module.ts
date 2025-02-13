import { Module } from '@nestjs/common';
import { ActionsService } from './actions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from 'src/core';

@Module({
  imports: [TypeOrmModule.forFeature([AdminEntity])],
  providers: [ActionsService],
  exports: [ActionsService],
})
export class ActionsModule {}
