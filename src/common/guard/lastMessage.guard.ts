import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { config } from 'src/config';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity, UsersRepository } from 'src/core/';
import { lastMessgeText } from '../constants';

@Injectable()
export class LastMessageGuard implements CanActivate {
  private readonly bot: Telegraf;

  constructor(
    @InjectRepository(UsersEntity) private readonly userRepo: UsersRepository,
  ) {
    this.bot = new Telegraf(config.TOKEN);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const [ctx] = context.getArgs();
    const user = await this.userRepo.findOne({
      where: { telegram_id: `${ctx.from.id}` },
    });
    if (
      ctx.session.lastMessage &&
      ctx.update.callback_query.message.message_id !=
        ctx.session.lastMessage.message_id
    ) {
      await ctx.answerCbQuery(lastMessgeText[user.lang], ctx.callbackQuery.id);
      await ctx.deleteMessage(ctx.update.callback_query.message.message_id);
      return;
    }
    return true;
  }
}
