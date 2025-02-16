import { Scene, SceneEnter, On, Ctx } from 'nestjs-telegraf';
import { InjectRepository } from '@nestjs/typeorm';
import { ContextType, messageFormAdmin } from 'src/common';
import { UsersEntity, UsersRepository } from 'src/core';
import { adminMenu, mainMessageForAdmin } from 'src/common/constants/admin';

@Scene('sendMessage')
export class SendMessage {
  constructor(
    @InjectRepository(UsersEntity) private readonly userRepo: UsersRepository,
  ) {}

  @SceneEnter()
  async onEnter(@Ctx() ctx: ContextType) {
    await ctx.editMessageText(`Yubormoqchi bo'lgan habaringizni kiriting: `);
  }

  @On('text')
  async onText(@Ctx() ctx: ContextType) {
    const message = (ctx.update as any).message.text;
    const user = await this.userRepo.findOne({
      where: { telegram_id: ctx.session.userId.toString() },
    });
    try {
      await ctx.telegram.sendMessage(
        user.telegram_id,
        messageFormAdmin[user.lang] + '\n' + message,
      );
      await ctx.reply('Habar yuborildi ✅');
    } catch (error) {
      await ctx.reply(`Hatolik yuz berdi: ${error.message}`);
    }
    ctx.session.lastMessage = await ctx.reply(mainMessageForAdmin, {
      reply_markup: adminMenu,
    });
    await ctx.scene.leave();
  }
}
