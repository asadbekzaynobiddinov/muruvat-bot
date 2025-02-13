import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { config } from 'src/config';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity, AdminRepository } from 'src/core/';

@Injectable()
export class AdminGuard implements CanActivate {
  private readonly bot: Telegraf;

  constructor(
    @InjectRepository(AdminEntity) private readonly adminRepo: AdminRepository,
  ) {
    this.bot = new Telegraf(config.TOKEN);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const [ctx] = context.getArgs();
    const admin = await this.adminRepo.findOne({
      where: { telegram_id: `${ctx.from.id}` },
    });
    if (!admin) {
      return false;
    }
    return true;
  }
}
