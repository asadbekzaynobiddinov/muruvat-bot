import { InjectRepository } from '@nestjs/typeorm';
import { Update, Ctx, Command, Action } from 'nestjs-telegraf';
import {
  startMessage,
  selectLangKeys,
  registerMessage,
  registerMenuKeys,
} from 'src/common/constants/';
import { ContextType } from 'src/common';
import { UsersEntity, UsersRepository } from 'src/core';

@Update()
export class BotService {
  constructor(
    @InjectRepository(UsersEntity) private readonly userRepo: UsersRepository,
  ) {}

  @Command('start')
  async start(@Ctx() ctx: ContextType) {
    const user = await this.userRepo.findOne({
      where: { telegram_id: `${ctx.from.id}` },
    });
    if (!user) {
      await ctx.reply(startMessage, { reply_markup: selectLangKeys });
      return;
    }
    await ctx.reply('Start');
  }

  @Action('uz')
  async setLangUz(@Ctx() ctx: ContextType) {
    ctx.session.lang = 'uz';
    await ctx.editMessageText(registerMessage.uz, {
      reply_markup: registerMenuKeys.uz,
    });
  }

  @Action('ru')
  async setLangRu(@Ctx() ctx: ContextType) {
    console.log(ctx.session.lang);
    ctx.session.lang = 'ru';
    await ctx.editMessageText(registerMessage.ru, {
      reply_markup: registerMenuKeys.ru,
    });
  }

  @Action('en')
  async setLangEn(@Ctx() ctx: ContextType) {
    ctx.session.lang = 'en';
    await ctx.editMessageText(registerMessage.en, {
      reply_markup: registerMenuKeys.en,
    });
  }

  @Action('generous')
  async registerGenerous(@Ctx() ctx: ContextType) {
    await ctx.scene.enter('registerAsGenerous');
  }

  @Action('patient')
  async registerPatient(@Ctx() ctx: ContextType) {
    await ctx.scene.enter('registerAsPatient');
  }
}
