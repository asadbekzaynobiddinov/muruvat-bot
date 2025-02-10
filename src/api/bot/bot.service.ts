import { InjectRepository } from '@nestjs/typeorm';
import { Update, Ctx, Command, Action } from 'nestjs-telegraf';
import {
  startMessage,
  selectLangKeys,
  registerMessage,
  registerMenuKeys,
  generousMenuKeys,
  mainMessage,
  patientMenuKeys,
} from 'src/common/constants/';
import { ContextType, Role } from 'src/common';
import { UsersEntity, UsersRepository } from 'src/core';
import { Languages } from 'src/common/enum/language';

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
    if (!user || !user.role || !user.lang) {
      await ctx.reply(startMessage, { reply_markup: selectLangKeys });
      return;
    }
    ctx.session.lang = user.lang;
    switch (user.role) {
      case 'generous':
        await ctx.reply(mainMessage[user.lang], {
          reply_markup: generousMenuKeys[user.lang],
        });
        break;
      case 'patient':
        await ctx.reply(mainMessage[user.lang], {
          reply_markup: patientMenuKeys[user.lang],
        });
      default:
        break;
    }
  }

  @Action('uz')
  async setLangUz(@Ctx() ctx: ContextType) {
    ctx.session.lang = 'uz';
    const newUser = this.userRepo.create({
      telegram_id: `${ctx.from.id}`,
      lang: Languages.UZ,
    });
    await this.userRepo.save(newUser);
    await ctx.editMessageText(registerMessage.uz, {
      reply_markup: registerMenuKeys.uz,
    });
  }

  @Action('ru')
  async setLangRu(@Ctx() ctx: ContextType) {
    const newUser = this.userRepo.create({
      telegram_id: `${ctx.from.id}`,
      lang: Languages.UZ,
    });
    await this.userRepo.save(newUser);
    ctx.session.lang = 'ru';
    await ctx.editMessageText(registerMessage.ru, {
      reply_markup: registerMenuKeys.ru,
    });
  }

  @Action('en')
  async setLangEn(@Ctx() ctx: ContextType) {
    ctx.session.lang = 'en';
    const newUser = this.userRepo.create({
      telegram_id: `${ctx.from.id}`,
      lang: Languages.UZ,
    });
    await this.userRepo.save(newUser);
    await ctx.editMessageText(registerMessage.en, {
      reply_markup: registerMenuKeys.en,
    });
  }

  @Action('generous')
  async registerGenerous(@Ctx() ctx: ContextType) {
    await this.userRepo.update(
      { telegram_id: `${ctx.from.id}` },
      { role: Role.GENEROUS },
    );
    await ctx.scene.enter('registerAsGenerous');
  }

  @Action('patient')
  async registerPatient(@Ctx() ctx: ContextType) {
    await this.userRepo.update(
      { telegram_id: `${ctx.from.id}` },
      { role: Role.PATIENT },
    );
    await ctx.scene.enter('registerAsPatient');
  }
}
