import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { config } from 'src/config';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity, UsersRepository } from 'src/core';
import { Role } from '../enum';

@Injectable()
export class PatientGuard implements CanActivate {
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
      if (!user || user.role != Role.PATIENT) {
        return false;
      }
      ctx.session.lang = user.lang;
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
