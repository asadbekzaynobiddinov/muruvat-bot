import { Module } from '@nestjs/common';
import { ScenesModule } from './scenes/scenes.module';
import { ActionsModule } from './actions/actions.module';
import { ButtonModule } from '../button/button.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsEntity, UsersEntity } from 'src/core';

@Module({
  imports: [
    ScenesModule,
    ActionsModule,
    ButtonModule,
    TypeOrmModule.forFeature([UsersEntity, PatientsEntity]),
  ],
})
export class SahiyModule {}
