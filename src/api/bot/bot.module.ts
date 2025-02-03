import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { options } from 'src/config/telegram.config';
import { CommandsModule } from './commands/commands.module';

@Module({
  imports: [TelegrafModule.forRootAsync(options()), CommandsModule],
})
export class BotModule {}
