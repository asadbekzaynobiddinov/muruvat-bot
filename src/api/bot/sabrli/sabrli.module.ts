import { Module } from '@nestjs/common';
import { ActionsModule } from './actions/actions.module';
import { ScenesModule } from './scenes/scenes.module';
import { ActionsService } from './actions/actions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsEntity, UsersEntity } from 'src/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, PatientsEntity]),
    ActionsModule,
    ScenesModule,
  ],
  providers: [ActionsService],
})
export class SabrliModule {}
