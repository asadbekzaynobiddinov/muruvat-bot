import { InjectRepository } from '@nestjs/typeorm';
import { Update, Ctx, Command } from 'nestjs-telegraf';
import { ContextType } from 'src/common';
import { AdminEntity, AdminRepository } from 'src/core';

@Update()
export class CommandsService {
  constructor(
    @InjectRepository(AdminEntity) private readonly adminRepo: AdminRepository,
  ) {}

  @Command('admin')
  async admin(@Ctx() ctx: ContextType) {
    const isAdmin = await this.adminRepo.findOne({
      where: { telegram_id: `${ctx.from.id}` },
    });
    if (isAdmin) {
      await ctx.reply('Admin');
    }
  }
}
