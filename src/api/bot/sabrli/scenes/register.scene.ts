import { InjectRepository } from '@nestjs/typeorm';
import { Action, Ctx, On, Scene, SceneEnter } from 'nestjs-telegraf';
import { Markup } from 'telegraf';
import {
  ContextType,
  acceptAddresMessage,
  askRegionMessage,
  backToRegionsForPatient,
  districtMessage,
  mainMessage,
  patientMenuKeys,
  phoneNumberKeys,
  PhoneNumberMessages,
  askNameMessage,
  removeMessage,
} from 'src/common';
import { UsersEntity, UsersRepository } from 'src/core';
import { ButtonsService } from '../../button/button.service';

@Scene('registerAsPatient')
export class RegisterScenes {
  constructor(
    @InjectRepository(UsersEntity) private readonly userRepo: UsersRepository,
  ) {}
  @SceneEnter()
  async onEnter(ctx: ContextType) {
    await ctx.editMessageText(askNameMessage[ctx.session.lang]);
  }
  @On('text')
  async textHandler(ctx: ContextType) {
    if ('text' in ctx.message) {
      const name = ctx.message.text;
      await this.userRepo.update({ telegram_id: `${ctx.from.id}` }, { name });
      await ctx.scene.enter('askPatientPhone');
    }
  }
}
@Scene('askPatientPhone')
export class AskPatientPhone {
  constructor(
    @InjectRepository(UsersEntity) private readonly userRepo: UsersRepository,
  ) {}
  @SceneEnter()
  async onEnter(ctx: ContextType) {
    ctx.reply(PhoneNumberMessages[ctx.session.lang], {
      reply_markup: phoneNumberKeys[ctx.session.lang],
      parse_mode: 'HTML',
    });
  }
  @On('contact')
  async textHandler(ctx: ContextType) {
    if ('contact' in ctx.message) {
      const { phone_number } = ctx.message.contact;
      await this.userRepo.update(
        { telegram_id: `${ctx.from.id}` },
        { phone_number: phone_number },
      );
      await ctx.scene.enter('askPatientRegion');
    }
  }
}
@Scene('askPatientRegion')
export class AskPatientAddress {
  constructor(
    @InjectRepository(UsersEntity) private readonly userRepo: UsersRepository,
    private readonly buttonService: ButtonsService,
  ) {}
  @SceneEnter()
  async onEnter(ctx: ContextType) {
    const buttons = this.buttonService.generateRegionButtons(
      0,
      ctx.session.lang,
      'regionForPatient',
    );
    await ctx.reply(removeMessage[ctx.session.lang], Markup.removeKeyboard());
    await ctx.reply(askRegionMessage[ctx.session.lang], {
      reply_markup: buttons,
    });
  }
  @Action(/regionForPatientPage/)
  async page(@Ctx() ctx: ContextType) {
    const [, page] = (ctx.update as any).callback_query.data.split('=');
    const buttons = this.buttonService.generateRegionButtons(
      +page,
      ctx.session.lang,
      'regionForPatient',
    );
    await ctx.editMessageText(askRegionMessage[ctx.session.lang], {
      reply_markup: buttons,
    });
  }
  @Action(/regionForPatient/)
  async callbackHandler(@Ctx() ctx: ContextType) {
    const [, region] = (ctx.update as any).callback_query.data.split('=');
    await this.userRepo.update({ telegram_id: `${ctx.from.id}` }, { region });
    await ctx.scene.enter('askPatientDistrict');
  }
}

@Scene('askPatientDistrict')
export class AskPatientDistrict {
  constructor(
    @InjectRepository(UsersEntity) private readonly userRepo: UsersRepository,
    private readonly buttonService: ButtonsService,
  ) {}
  @SceneEnter()
  async onEnter(ctx: ContextType) {
    const [, region] = (ctx.update as any).callback_query.data.split('=');
    const buttons = this.buttonService.generateDistrictButtons(
      region,
      0,
      ctx.session.lang,
      'districtForPatient',
    );
    await ctx.editMessageText(districtMessage[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: [
          ...buttons.inline_keyboard,
          ...backToRegionsForPatient[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }
  @Action(/districtForPatientPage/)
  async page(@Ctx() ctx: ContextType) {
    const user = await this.userRepo.findOne({
      where: { telegram_id: `${ctx.from.id}` },
    });
    const [, page] = (ctx.update as any).callback_query.data.split('=');
    const buttons = this.buttonService.generateDistrictButtons(
      user.region,
      +page,
      user.lang,
      'districtForPatient',
    );
    await ctx.editMessageText(districtMessage[user.lang], {
      reply_markup: {
        inline_keyboard: [
          ...buttons.inline_keyboard,
          ...backToRegionsForPatient[user.lang].inline_keyboard,
        ],
      },
    });
  }
  @Action('back_to_r_for_p')
  async backToRegions(@Ctx() ctx: ContextType) {
    await this.userRepo.update(
      {
        telegram_id: `${ctx.from.id}`,
      },
      {
        region: null,
      },
    );
    const buttons = this.buttonService.generateRegionButtons(
      0,
      ctx.session.lang,
      'regionForPatient',
    );
    await ctx.editMessageText(askRegionMessage[ctx.session.lang], {
      reply_markup: buttons,
    });
  }
  @Action(/districtForPatient/)
  async callbackHandler(ctx: ContextType) {
    const [, districts] = (ctx.update as any).callback_query.data.split('=');
    await this.userRepo.update(
      { telegram_id: `${ctx.from.id}` },
      {
        district: districts,
      },
    );
    await ctx.editMessageText(acceptAddresMessage[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: [
          [
            Markup.button.callback('✅', 'accept'),
            Markup.button.callback('❌', 'reject'),
          ],
        ],
      },
    });
  }
  @Action('accept')
  async acceptDistrict(@Ctx() ctx: ContextType) {
    await ctx.editMessageText(mainMessage[ctx.session.lang], {
      reply_markup: patientMenuKeys[ctx.session.lang],
    });
    await ctx.scene.leave();
  }
  @Action('reject')
  async reject(@Ctx() ctx: ContextType) {
    const user = await this.userRepo.findOne({
      where: { telegram_id: `${ctx.from.id}` },
    });
    await this.userRepo.update(
      { telegram_id: `${ctx.from.id}` },
      { district: null },
    );
    const buttons = this.buttonService.generateDistrictButtons(
      user.region,
      0,
      ctx.session.lang,
      'districtForPatient',
    );
    await ctx.editMessageText(districtMessage[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: [
          ...buttons.inline_keyboard,
          ...backToRegionsForPatient[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }
  @Action(/regionForPatientPage/)
  async regionPage(@Ctx() ctx: ContextType) {
    const [, page] = (ctx.update as any).callback_query.data.split('=');
    const buttons = this.buttonService.generateRegionButtons(
      +page,
      ctx.session.lang,
      'regionForPatient',
    );
    await ctx.editMessageText(askRegionMessage[ctx.session.lang], {
      reply_markup: buttons,
    });
  }
  @Action(/regionForPatient/)
  async regionHandler(ctx: ContextType) {
    const [, region] = (ctx.update as any).callback_query.data.split('=');
    await this.userRepo.update(
      { telegram_id: `${ctx.from.id}` },
      {
        region,
      },
    );
    const buttons = this.buttonService.generateDistrictButtons(
      region,
      0,
      ctx.session.lang,
      'districtForPatient',
    );
    await ctx.editMessageText(districtMessage[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: [
          ...buttons.inline_keyboard,
          ...backToRegionsForPatient[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }
}
