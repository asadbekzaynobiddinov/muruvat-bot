import { Module } from '@nestjs/common';
import { ActionsService } from './actions.service';
import { ButtonsService } from '../../button/button.service';
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
  providers: [ButtonsService, ActionsService],
})
export class ActionsModule {}
