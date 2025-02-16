import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { config } from 'src/config';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity, UsersRepository } from 'src/core';

@Injectable()
export class LangGuard implements CanActivate {
  private readonly bot: Telegraf;

  constructor(
    @InjectRepository(UsersEntity) private readonly userRepo: UsersRepository,
  ) {
    this.bot = new Telegraf(config.TOKEN);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const [ctx] = context.getArgs();
    try {
      const user = await this.userRepo.findOne({
        where: { telegram_id: `${ctx.from.id}` },
      });
      if (user) {
        ctx.session.lang = user.lang;
      } else {
        ctx.session.lang = 'uz';
      }
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  }
}
