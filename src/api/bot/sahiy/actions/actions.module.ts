import { Module } from '@nestjs/common';
import { ButtonModule } from '../../button/button.module';
import { ActionsService } from './actions.service';
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
