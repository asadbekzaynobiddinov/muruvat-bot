import { Module } from '@nestjs/common';
import { ActionsService } from './actions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AdminEntity,
  GenerousEntity,
  PatientsEntity,
  UsersEntity,
} from 'src/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AdminEntity,
      PatientsEntity,
      AdminEntity,
      GenerousEntity,
      UsersEntity,
    ]),
  ],
  providers: [ActionsService],
})
export class ActionsModule {}
