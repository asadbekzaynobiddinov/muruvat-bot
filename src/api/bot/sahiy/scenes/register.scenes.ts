import { InjectRepository } from '@nestjs/typeorm';
import { Scene, SceneEnter, On, Action, Ctx } from 'nestjs-telegraf';
import {
  ContextType,
  askNameMessage,
  // generousMenuKeys,
  // mainMessage,
  PhoneNumberMessages,
  phoneNumberKeys,
  regionKeys,
  // regionKeys,
  askRegionMessage,
  tashkentRegionCitysKeys,
  tashkentCitysKeys,
  ferganaCitysKeys,
  samarkandCityKeys,
  bukharaCityKeys,
  namanganCityKeys,
  andijanCityKeys,
  qashqadaryaCityKeys,
  jizzaxCityKeys,
  sirdaryoCityKeys,
  xorazmCityKeys,
  navoiCityKeys,
  surxandaryaCityKeys,
  districtMessage,
  mainMessage,
  generousMenuKeys,
  backToRegions,
  acceptAddresMessage,
} from 'src/common/';
import { UsersEntity, UsersRepository } from 'src/core';
import { ButtonsService } from '../../button/button.service';
import { InlineKeyboardMarkup } from '@telegraf/types';
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
      console.log(name);
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
      console.log(phone_number);
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
    const buttons = this.buttonService.generateButtons(
      regionKeys[ctx.session.lang],
      0,
      ctx.session.lang,
    );
    await ctx.reply(askRegionMessage[ctx.session.lang], {
      reply_markup: buttons,
    });
  }

  @Action(/page/)
  async page(@Ctx() ctx: ContextType) {
    const [, page] = (ctx.update as any).callback_query.data.split('_');
    const buttons = this.buttonService.generateButtons(
      regionKeys[ctx.session.lang],
      +page,
      ctx.session.lang,
    );
    await ctx.editMessageText(askRegionMessage[ctx.session.lang], {
      reply_markup: buttons,
    });
  }

  @Action(/region/)
  async callbackHandler(ctx: ContextType) {
    const [, region] = (ctx.update as any).callback_query.data.split('_');
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
    const [, region] = (ctx.update as any).callback_query.data.split('_');
    let buttons: InlineKeyboardMarkup;
    switch (region) {
      case 'toshken shahar':
        buttons = this.buttonService.generateButtons(
          tashkentCitysKeys[ctx.session.lang],
          0,
          ctx.session.lang,
        );
        await ctx.editMessageText(districtMessage[ctx.session.lang], {
          reply_markup: {
            inline_keyboard: [
              ...buttons.inline_keyboard,
              ...backToRegions[ctx.session.lang].inline_keyboard,
            ],
          },
        });
        break;
      case 'toshkent viloyat':
        buttons = this.buttonService.generateButtons(
          tashkentRegionCitysKeys[ctx.session.lang],
          0,
          ctx.session.lang,
        );
        await ctx.editMessageText(districtMessage[ctx.session.lang], {
          reply_markup: {
            inline_keyboard: [
              ...buttons.inline_keyboard,
              ...backToRegions[ctx.session.lang].inline_keyboard,
            ],
          },
        });
        break;
      case 'samarqand':
        buttons = this.buttonService.generateButtons(
          samarkandCityKeys[ctx.session.lang],
          0,
          ctx.session.lang,
        );
        await ctx.editMessageText(districtMessage[ctx.session.lang], {
          reply_markup: {
            inline_keyboard: [
              ...buttons.inline_keyboard,
              ...backToRegions[ctx.session.lang].inline_keyboard,
            ],
          },
        });
        break;
      case 'buxoro':
        buttons = this.buttonService.generateButtons(
          bukharaCityKeys[ctx.session.lang],
          0,
          ctx.session.lang,
        );
        await ctx.editMessageText(districtMessage[ctx.session.lang], {
          reply_markup: {
            inline_keyboard: [
              ...buttons.inline_keyboard,
              ...backToRegions[ctx.session.lang].inline_keyboard,
            ],
          },
        });
        break;
      case 'andijon':
        buttons = this.buttonService.generateButtons(
          andijanCityKeys[ctx.session.lang],
          0,
          ctx.session.lang,
        );
        await ctx.editMessageText(districtMessage[ctx.session.lang], {
          reply_markup: {
            inline_keyboard: [
              ...buttons.inline_keyboard,
              ...backToRegions[ctx.session.lang].inline_keyboard,
            ],
          },
        });
        break;
      case 'fargona':
        buttons = this.buttonService.generateButtons(
          ferganaCitysKeys[ctx.session.lang],
          0,
          ctx.session.lang,
        );
        await ctx.editMessageText(districtMessage[ctx.session.lang], {
          reply_markup: {
            inline_keyboard: [
              ...buttons.inline_keyboard,
              ...backToRegions[ctx.session.lang].inline_keyboard,
            ],
          },
        });
        break;
      case 'namangan':
        buttons = this.buttonService.generateButtons(
          namanganCityKeys[ctx.session.lang],
          0,
          ctx.session.lang,
        );
        await ctx.editMessageText(districtMessage[ctx.session.lang], {
          reply_markup: {
            inline_keyboard: [
              ...buttons.inline_keyboard,
              ...backToRegions[ctx.session.lang].inline_keyboard,
            ],
          },
        });
        break;
      case 'qashqadaryo':
        buttons = this.buttonService.generateButtons(
          qashqadaryaCityKeys[ctx.session.lang],
          0,
          ctx.session.lang,
        );
        await ctx.editMessageText(districtMessage[ctx.session.lang], {
          reply_markup: {
            inline_keyboard: [
              ...buttons.inline_keyboard,
              ...backToRegions[ctx.session.lang].inline_keyboard,
            ],
          },
        });
        break;
      case 'jizzax':
        buttons = this.buttonService.generateButtons(
          jizzaxCityKeys[ctx.session.lang],
          0,
          ctx.session.lang,
        );
        await ctx.editMessageText(districtMessage[ctx.session.lang], {
          reply_markup: {
            inline_keyboard: [
              ...buttons.inline_keyboard,
              ...backToRegions[ctx.session.lang].inline_keyboard,
            ],
          },
        });
        break;
      case 'sirdaryo':
        buttons = this.buttonService.generateButtons(
          sirdaryoCityKeys[ctx.session.lang],
          0,
          ctx.session.lang,
        );
        await ctx.editMessageText(districtMessage[ctx.session.lang], {
          reply_markup: {
            inline_keyboard: [
              ...buttons.inline_keyboard,
              ...backToRegions[ctx.session.lang].inline_keyboard,
            ],
          },
        });
        break;
      case 'xorazm':
        buttons = this.buttonService.generateButtons(
          xorazmCityKeys[ctx.session.lang],
          0,
          ctx.session.lang,
        );
        await ctx.editMessageText(districtMessage[ctx.session.lang], {
          reply_markup: {
            inline_keyboard: [
              ...buttons.inline_keyboard,
              ...backToRegions[ctx.session.lang].inline_keyboard,
            ],
          },
        });
        break;
      case 'navoiy':
        buttons = this.buttonService.generateButtons(
          navoiCityKeys[ctx.session.lang],
          0,
          ctx.session.lang,
        );
        await ctx.editMessageText(districtMessage[ctx.session.lang], {
          reply_markup: {
            inline_keyboard: [
              ...buttons.inline_keyboard,
              ...backToRegions[ctx.session.lang].inline_keyboard,
            ],
          },
        });
        break;
      case 'surxondaryo':
        buttons = this.buttonService.generateButtons(
          surxandaryaCityKeys[ctx.session.lang],
          0,
          ctx.session.lang,
        );
        await ctx.editMessageText(districtMessage[ctx.session.lang], {
          reply_markup: {
            inline_keyboard: [
              ...buttons.inline_keyboard,
              ...backToRegions[ctx.session.lang].inline_keyboard,
            ],
          },
        });
        break;
      case 'qoraqalpogiston':
        buttons = this.buttonService.generateButtons(
          qashqadaryaCityKeys[ctx.session.lang],
          0,
          ctx.session.lang[ctx.session.lang],
        );
        await ctx.editMessageText(districtMessage[ctx.session.lang], {
          reply_markup: {
            inline_keyboard: [
              ...buttons.inline_keyboard,
              ...backToRegions[ctx.session.lang].inline_keyboard,
            ],
          },
        });
        break;
      default:
        break;
    }
  }

  @Action(/page/)
  async page(@Ctx() ctx: ContextType) {
    const user = await this.userRepo.findOne({
      where: { telegram_id: `${ctx.from.id}` },
    });
    const [, page] = (ctx.update as any).callback_query.data.split('_');
    let buttons: InlineKeyboardMarkup;
    switch (user.region) {
      case 'toshken shahar':
        buttons = this.buttonService.generateButtons(
          tashkentCitysKeys[ctx.session.lang],
          +page,
          ctx.session.lang,
        );
        await ctx.editMessageText(districtMessage[ctx.session.lang], {
          reply_markup: buttons,
        });
        break;
      case 'toshkent viloyat':
        buttons = this.buttonService.generateButtons(
          tashkentRegionCitysKeys[ctx.session.lang],
          +page,
          ctx.session.lang,
        );
        await ctx.editMessageText(districtMessage[ctx.session.lang], {
          reply_markup: buttons,
        });
        break;
      case 'samarqand':
        buttons = this.buttonService.generateButtons(
          samarkandCityKeys[ctx.session.lang],
          +page,
          ctx.session.lang,
        );
        await ctx.editMessageText(districtMessage[ctx.session.lang], {
          reply_markup: buttons,
        });
        break;
      case 'buxoro':
        buttons = this.buttonService.generateButtons(
          bukharaCityKeys[ctx.session.lang],
          +page,
          ctx.session.lang,
        );
        await ctx.editMessageText(districtMessage[ctx.session.lang], {
          reply_markup: buttons,
        });
        break;
      case 'andijon':
        buttons = this.buttonService.generateButtons(
          andijanCityKeys[ctx.session.lang],
          +page,
          ctx.session.lang,
        );
        await ctx.editMessageText(districtMessage[ctx.session.lang], {
          reply_markup: buttons,
        });
        break;
      case 'fargona':
        buttons = this.buttonService.generateButtons(
          ferganaCitysKeys[ctx.session.lang],
          +page,
          ctx.session.lang,
        );
        await ctx.editMessageText(districtMessage[ctx.session.lang], {
          reply_markup: buttons,
        });
        break;
      case 'namangan':
        buttons = this.buttonService.generateButtons(
          namanganCityKeys[ctx.session.lang],
          +page,
          ctx.session.lang,
        );
        await ctx.editMessageText(districtMessage[ctx.session.lang], {
          reply_markup: buttons,
        });
        break;
      case 'qashqadaryo':
        buttons = this.buttonService.generateButtons(
          qashqadaryaCityKeys[ctx.session.lang],
          +page,
          ctx.session.lang,
        );
        await ctx.editMessageText(districtMessage[ctx.session.lang], {
          reply_markup: buttons,
        });
        break;
      case 'jizzax':
        buttons = this.buttonService.generateButtons(
          jizzaxCityKeys[ctx.session.lang],
          +page,
          ctx.session.lang,
        );
        await ctx.editMessageText(districtMessage[ctx.session.lang], {
          reply_markup: buttons,
        });
        break;
      case 'sirdaryo':
        buttons = this.buttonService.generateButtons(
          sirdaryoCityKeys[ctx.session.lang],
          +page,
          ctx.session.lang,
        );
        await ctx.editMessageText(districtMessage[ctx.session.lang], {
          reply_markup: buttons,
        });
        break;
      case 'xorazm':
        buttons = this.buttonService.generateButtons(
          xorazmCityKeys[ctx.session.lang],
          +page,
          ctx.session.lang,
        );
        await ctx.editMessageText(districtMessage[ctx.session.lang], {
          reply_markup: buttons,
        });
        break;
      case 'navoiy':
        buttons = this.buttonService.generateButtons(
          navoiCityKeys[ctx.session.lang],
          +page,
          ctx.session.lang,
        );
        await ctx.editMessageText(districtMessage[ctx.session.lang], {
          reply_markup: buttons,
        });
        break;
      case 'surxondaryo':
        buttons = this.buttonService.generateButtons(
          surxandaryaCityKeys[ctx.session.lang],
          +page,
          ctx.session.lang,
        );
        await ctx.editMessageText(districtMessage[ctx.session.lang], {
          reply_markup: buttons,
        });
        break;
      case 'qoraqalpogiston':
        buttons = this.buttonService.generateButtons(
          qashqadaryaCityKeys[ctx.session.lang],
          +page,
          ctx.session.lang[ctx.session.lang],
        );
        await ctx.editMessageText(districtMessage[ctx.session.lang], {
          reply_markup: buttons,
        });
        break;
      default:
        break;
    }
  }

  @Action(/district/)
  async callbackHandler(ctx: ContextType) {
    const [, district] = (ctx.update as any).callback_query.data.split('_');
    await this.userRepo.update({ telegram_id: `${ctx.from.id}` }, { district });
    await ctx.reply(mainMessage[ctx.session.lang], {
      reply_markup: generousMenuKeys[ctx.session.lang],
    });
    await ctx.scene.leave();
  }
}

@Scene('acceptAddres')
export class AcceptRegion {
  constructor(
    @InjectRepository(UsersEntity) private readonly userRepo: UsersRepository,
    private readonly buttonService: ButtonsService,
  ) {}

  @SceneEnter()
  async onEnter(@Ctx() ctx: ContextType) {
    const user = await this.userRepo.findOne({
      where: { telegram_id: `${ctx.from.id}` },
    });
    const message =
      `${acceptAddresMessage[user.lang][0]}\n` +
      `${acceptAddresMessage[user.lang][1]}${user.region.charAt(0).toUpperCase() + user.region.slice(1)}\n` +
      `${acceptAddresMessage[user.lang][2]}${user.district.charAt(0).toUpperCase() + user.district.slice(1)}`;
    await ctx.reply(message, {
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
    await ctx.reply(mainMessage[ctx.session.lang], {
      reply_markup: generousMenuKeys[ctx.session.lang],
    });
    await ctx.scene.leave();
  }
}
