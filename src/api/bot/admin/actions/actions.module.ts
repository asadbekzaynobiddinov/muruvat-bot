import { Module } from '@nestjs/common';
import { ActionsService } from './actions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity, PatientsEntity } from 'src/core';

@Module({
  imports: [TypeOrmModule.forFeature([AdminEntity, PatientsEntity])],
  providers: [ActionsService],
})
export class ActionsModule {}
