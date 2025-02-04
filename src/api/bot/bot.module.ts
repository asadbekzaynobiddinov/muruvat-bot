import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { options } from 'src/config/telegram.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AdminEntity,
  GenerousEntity,
  PatientsEntity,
  UsersEntity,
} from 'src/core';
import { AdminModule } from './admin/admin.module';
import { SahiyModule } from './sahiy/sahiy.module';
import { SabrliModule } from './sabrli/sabrli.module';
import { BotService } from './bot.service';

@Module({
  imports: [
    TelegrafModule.forRootAsync(options()),
    TypeOrmModule.forFeature([
      AdminEntity,
      UsersEntity,
      GenerousEntity,
      PatientsEntity,
    ]),
    AdminModule,
    SahiyModule,
    SabrliModule,
  ],
  providers: [BotService],
})
export class BotModule {}
