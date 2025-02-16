import { Module } from '@nestjs/common';
import { ActionsModule } from './actions/actions.module';
import { CommandsModule } from './commands/commands.module';
import { ScenesModule } from './scenes/scenes.module';
import { ActionsService } from './actions/actions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AdminEntity,
  GenerousEntity,
  PatientsEntity,
  UsersEntity,
} from 'src/core';
import { ButtonModule } from '../button/button.module';

@Module({
  providers: [ActionsService],
  imports: [
    CommandsModule,
    ScenesModule,
    ActionsModule,
    ButtonModule,
    TypeOrmModule.forFeature([
      UsersEntity,
      PatientsEntity,
      GenerousEntity,
      AdminEntity,
    ]),
  ],
})
export class AdminModule {}
