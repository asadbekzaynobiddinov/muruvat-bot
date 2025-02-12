import { InjectRepository } from '@nestjs/typeorm';
import { Action, Ctx, On, Scene, SceneEnter } from 'nestjs-telegraf';
import { Markup } from 'telegraf';
import {
  acceptPhoneMessage,
  askPhoneMessage,
  backToPatientMenu,
  ContextType,
  correctFormatPhone,
  mainMessage,
  settingsKeysForPatient,
  uzPhoneRegex,
} from 'src/common';
import { UsersEntity, UsersRepository } from 'src/core';

@Scene('ChangePatientPhoneScene')
export class changePatientPhone {
  constructor(
    @InjectRepository(UsersEntity) private readonly userRepo: UsersRepository,
  ) {}
  @SceneEnter()
  async onEnter(@Ctx() ctx: ContextType) {
    await ctx.editMessageText(askPhoneMessage[ctx.session.lang]);
  }
  @On('text')
  async onText(@Ctx() ctx: ContextType) {
    const phone_number = (ctx.message as any).text;
    if (!uzPhoneRegex.test(phone_number)) {
      await ctx.reply(correctFormatPhone[ctx.session.lang]);
      return;
    }
    await ctx.reply(
      acceptPhoneMessage[ctx.session.lang][0] +
        '\n' +
        acceptPhoneMessage[ctx.session.lang][1] +
        phone_number,
      {
        reply_markup: {
          inline_keyboard: [
            [
              Markup.button.callback('✅', `accept_${phone_number}`),
              Markup.button.callback('❌', `reject_${phone_number}`),
            ],
          ],
        },
      },
    );
  }
  @Action(/accept/)
  async accept(@Ctx() ctx: ContextType) {
    const [, phone_number] = (ctx.update as any).callback_query.data.split('_');
    await this.userRepo.update(
      { telegram_id: `${ctx.from.id}` },
      { phone_number },
    );
    await ctx.editMessageText(mainMessage[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: [
          ...settingsKeysForPatient[ctx.session.lang].inline_keyboard,
          ...backToPatientMenu[ctx.session.lang].inline_keyboard,
        ],
      },
    });
    await ctx.scene.leave();
  }

  @Action(/reject/)
  async reject(@Ctx() ctx: ContextType) {
    await ctx.editMessageText(mainMessage[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: [
          ...settingsKeysForPatient[ctx.session.lang].inline_keyboard,
          ...backToPatientMenu[ctx.session.lang].inline_keyboard,
        ],
      },
    });
    await ctx.scene.leave();
  }
}
