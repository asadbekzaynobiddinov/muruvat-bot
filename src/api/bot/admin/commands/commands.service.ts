import { UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Update, Ctx, Command } from 'nestjs-telegraf';
import { ContextType } from 'src/common';
import { adminMenu, mainMessageForAdmin } from 'src/common/constants/admin';
import { AdminGuard } from 'src/common/guard/admin.guard';
import { AdminEntity, AdminRepository } from 'src/core';

@Update()
@UseGuards(AdminGuard)
export class CommandsService {
  constructor(
    @InjectRepository(AdminEntity) private readonly adminRepo: AdminRepository,
  ) {}

  @Command('admin')
  async admin(@Ctx() ctx: ContextType) {
    ctx.session.lastMessage = await ctx.reply(mainMessageForAdmin, {
      reply_markup: adminMenu,
    });
  }
}
