import { InjectRepository } from '@nestjs/typeorm';
import { Scene, SceneEnter, On, Action, Ctx } from 'nestjs-telegraf';
import {
  ContextType,
  askNameMessage,
  PhoneNumberMessages,
  phoneNumberKeys,
  askRegionMessage,
  districtMessage,
  mainMessage,
  generousMenuKeys,
  backToRegionsForGenerous,
  acceptAddresMessage,
  removeMessage,
} from 'src/common/';
import { UsersEntity, UsersRepository } from 'src/core';
import { ButtonsService } from '../../button/button.service';
import { Markup } from 'telegraf';

@Scene('registerAsGenerous')
export class RegisterAsGenerous {
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
      await ctx.scene.enter('askGenerousPhone');
    }
  }
}

@Scene('askGenerousPhone')
export class AskGenerousPhone {
  constructor(
    @InjectRepository(UsersEntity) private readonly userRepo: UsersRepository,
  ) {}
  @SceneEnter()
  async onEnter(ctx: ContextType) {
    await ctx.reply(PhoneNumberMessages[ctx.session.lang], {
      reply_markup: phoneNumberKeys[ctx.session.lang],
      parse_mode: 'HTML',
    });
  }

  @On('contact')
  async textHandler(ctx: ContextType) {
    if ('contact' in ctx.message) {
      const contact = ctx.message.contact as { phone_number: string };
      const phone_number = contact.phone_number;
      await this.userRepo.update(
        { telegram_id: `${ctx.from.id}` },
        { phone_number },
      );
      await ctx.scene.enter('askGenerousProvince');
    }
  }
}

@Scene('askGenerousProvince')
export class AskGenerousProvince {
  constructor(
    @InjectRepository(UsersEntity) private readonly userRepo: UsersRepository,
    private readonly buttonService: ButtonsService,
  ) {}
  @SceneEnter()
  async onEnter(ctx: ContextType) {
    const buttons = this.buttonService.generateRegionButtons(
      0,
      ctx.session.lang,
      'regionForRegisterAsG',
    );
    await ctx.reply(removeMessage[ctx.session.lang], Markup.removeKeyboard());
    await ctx.reply(askRegionMessage[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: [...buttons.inline_keyboard],
      },
    });
  }

  @Action(/regionForRegisterAsGPage/)
  async page(@Ctx() ctx: ContextType) {
    const [, page] = (ctx.update as any).callback_query.data.split('=');
    const buttons = this.buttonService.generateRegionButtons(
      +page,
      ctx.session.lang,
      'regionForRegisterAsG',
    );
    await ctx.editMessageText(askRegionMessage[ctx.session.lang], {
      reply_markup: buttons,
    });
  }

  @Action(/regionForRegisterAsG/)
  async callbackHandler(ctx: ContextType) {
    const [, region] = (ctx.update as any).callback_query.data.split('=');
    await this.userRepo.update({ telegram_id: `${ctx.from.id}` }, { region });
    await ctx.scene.enter('askGenerousDistrict');
  }
}

@Scene('askGenerousDistrict')
export class AskGenerousDistrict {
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
      'districtForRegisterAsG',
    );
    await ctx.editMessageText(districtMessage[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: [
          ...buttons.inline_keyboard,
          ...backToRegionsForGenerous[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }

  @Action(/districtForRegisterAsGPage/)
  async page(@Ctx() ctx: ContextType) {
    const user = await this.userRepo.findOne({
      where: { telegram_id: `${ctx.from.id}` },
    });
    const [, page] = (ctx.update as any).callback_query.data.split('=');
    const buttons = this.buttonService.generateDistrictButtons(
      user.region,
      +page,
      user.lang,
      'districtForRegisterAsG',
    );
    await ctx.editMessageText(districtMessage[user.lang], {
      reply_markup: {
        inline_keyboard: [
          ...buttons.inline_keyboard,
          ...backToRegionsForGenerous[user.lang].inline_keyboard,
        ],
      },
    });
  }

  @Action('backToRegForGenerous')
  async backToRegions(@Ctx() ctx: ContextType) {
    await this.userRepo.update(
      { telegram_id: `${ctx.from.id}` },
      { region: null },
    );
    const buttons = this.buttonService.generateRegionButtons(
      0,
      ctx.session.lang,
      'regionForRegisterAsG',
    );
    await ctx.editMessageText(askRegionMessage[ctx.session.lang], {
      reply_markup: buttons,
    });
  }

  @Action(/districtForRegisterAsG/)
  async callbackHandler(ctx: ContextType) {
    const [, district] = (ctx.update as any).callback_query.data.split('=');
    await this.userRepo.update({ telegram_id: `${ctx.from.id}` }, { district });
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
  async accept(@Ctx() ctx: ContextType) {
    ctx.session.lastMessage = await ctx.editMessageText(
      mainMessage[ctx.session.lang],
      {
        reply_markup: generousMenuKeys[ctx.session.lang],
      },
    );
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
      'districtForRegisterAsG',
    );
    await ctx.editMessageText(districtMessage[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: [
          ...buttons.inline_keyboard,
          ...backToRegionsForGenerous[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }

  @Action(/regionForRegisterAsGPage/)
  async pageRegion(@Ctx() ctx: ContextType) {
    const [, page] = (ctx.update as any).callback_query.data.split('=');
    const buttons = this.buttonService.generateRegionButtons(
      +page,
      ctx.session.lang,
      'regionForRegisterAsG',
    );
    await ctx.editMessageText(askRegionMessage[ctx.session.lang], {
      reply_markup: buttons,
    });
  }

  @Action(/regionForRegisterAsG/)
  async regionHandler(ctx: ContextType) {
    const [, region] = (ctx.update as any).callback_query.data.split('=');
    await this.userRepo.update({ telegram_id: `${ctx.from.id}` }, { region });
    const buttons = this.buttonService.generateDistrictButtons(
      region,
      0,
      ctx.session.lang,
      'districtForRegisterAsG',
    );
    await ctx.editMessageText(districtMessage[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: [
          ...buttons.inline_keyboard,
          ...backToRegionsForGenerous[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }
}
