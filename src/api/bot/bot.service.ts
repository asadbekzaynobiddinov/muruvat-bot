import { InjectRepository } from '@nestjs/typeorm';
import { Update, Ctx, Command } from 'nestjs-telegraf';
import { UsersEntity, UsersRepository } from 'src/core';
import { Context } from 'telegraf';

@Update()
export class BotService {
  constructor(
    @InjectRepository(UsersEntity) private readonly userRepo: UsersRepository,
  ) {}

  @Command('start')
  async start(@Ctx() ctx: Context) {
    await ctx.reply('Bot is running');
  }
}
