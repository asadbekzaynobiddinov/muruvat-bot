import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { CommandsModule } from './commands/commands.module';
import { options } from 'src/config/telegram.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AdminEntity,
  GenerousEntity,
  PatientsEntity,
  UsersEntity,
} from 'src/core';

@Module({
  imports: [
    TelegrafModule.forRootAsync(options()),
    TypeOrmModule.forFeature([
      AdminEntity,
      UsersEntity,
      GenerousEntity,
      PatientsEntity,
    ]),
    CommandsModule,
  ],
})
export class BotModule {}
