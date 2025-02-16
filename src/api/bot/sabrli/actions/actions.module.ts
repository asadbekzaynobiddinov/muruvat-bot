import { Module } from '@nestjs/common';
import { ActionsService } from './actions.service';
import { ButtonModule } from '../../button/button.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsEntity, UsersEntity } from 'src/core';

@Module({
  imports: [
    ButtonModule,
    TypeOrmModule.forFeature([UsersEntity, PatientsEntity]),
  ],
  providers: [ActionsService],
})
export class ActionsModule {}
