import { InjectRepository } from '@nestjs/typeorm';
import { Action, Ctx, On, Scene, SceneEnter } from 'nestjs-telegraf';
import { ContextType } from 'src/common';
import {
  andijanCityKeys,
  askRegionMessage,
  bukharaCityKeys,
  districtMessage,
  ferganaCitysKeys,
  jizzaxCityKeys,
  namanganCityKeys,
  navoiCityKeys,
  phoneNumberKeys,
  PhoneNumberMessages,
  qashqadaryaCityKeys,
  regionMessage,
  samarkandCityKeys,
  sirdaryoCityKeys,
  surxandaryaCityKeys,
  tashkentCitysKeys,
  tashkentRegionCitysKeys,
  xorazmCityKeys,
} from 'src/common/constants';
import { askNameMessage, regionKeys } from 'src/common';
import { UsersEntity, UsersRepository } from 'src/core';
import { ButtonsService } from '../../button/button.service';
import { InlineKeyboardMarkup } from '@telegraf/types';

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
    await ctx.editMessageText(regionMessage[ctx.session.lang], {
      reply_markup: buttons,
    });
  }
  @Action(/region/)
  async callbackHandler(@Ctx() ctx: ContextType) {
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
          reply_markup: buttons,
        });
        break;
      case 'toshkent viloyat':
        buttons = this.buttonService.generateButtons(
          tashkentRegionCitysKeys[ctx.session.lang],
          0,
          ctx.session.lang,
        );
        await ctx.editMessageText(districtMessage[ctx.session.lang], {
          reply_markup: buttons,
        });
        break;
      case 'samarqand':
        buttons = this.buttonService.generateButtons(
          samarkandCityKeys[ctx.session.lang],
          0,
          ctx.session.lang,
        );
        await ctx.editMessageText(districtMessage[ctx.session.lang], {
          reply_markup: buttons,
        });
        break;
      case 'buxoro':
        buttons = this.buttonService.generateButtons(
          bukharaCityKeys[ctx.session.lang],
          0,
          ctx.session.lang,
        );
        await ctx.editMessageText(districtMessage[ctx.session.lang], {
          reply_markup: buttons,
        });
        break;
      case 'andijon':
        buttons = this.buttonService.generateButtons(
          andijanCityKeys[ctx.session.lang],
          0,
          ctx.session.lang,
        );
        await ctx.editMessageText(districtMessage[ctx.session.lang], {
          reply_markup: buttons,
        });
        break;
      case 'fargona':
        buttons = this.buttonService.generateButtons(
          ferganaCitysKeys[ctx.session.lang],
          0,
          ctx.session.lang,
        );
        await ctx.editMessageText(districtMessage[ctx.session.lang], {
          reply_markup: buttons,
        });
        break;
      case 'namangan':
        buttons = this.buttonService.generateButtons(
          namanganCityKeys[ctx.session.lang],
          0,
          ctx.session.lang,
        );
        await ctx.editMessageText(districtMessage[ctx.session.lang], {
          reply_markup: buttons,
        });
        break;
      case 'qashqadaryo':
        buttons = this.buttonService.generateButtons(
          qashqadaryaCityKeys[ctx.session.lang],
          0,
          ctx.session.lang,
        );
        await ctx.editMessageText(districtMessage[ctx.session.lang], {
          reply_markup: buttons,
        });
        break;
      case 'jizzax':
        buttons = this.buttonService.generateButtons(
          jizzaxCityKeys[ctx.session.lang],
          0,
          ctx.session.lang,
        );
        await ctx.editMessageText(districtMessage[ctx.session.lang], {
          reply_markup: buttons,
        });
        break;
      case 'sirdaryo':
        buttons = this.buttonService.generateButtons(
          sirdaryoCityKeys[ctx.session.lang],
          0,
          ctx.session.lang,
        );
        await ctx.editMessageText(districtMessage[ctx.session.lang], {
          reply_markup: buttons,
        });
        break;
      case 'xorazm':
        buttons = this.buttonService.generateButtons(
          xorazmCityKeys[ctx.session.lang],
          0,
          ctx.session.lang,
        );
        await ctx.editMessageText(districtMessage[ctx.session.lang], {
          reply_markup: buttons,
        });
        break;
      case 'navoiy':
        buttons = this.buttonService.generateButtons(
          navoiCityKeys[ctx.session.lang],
          0,
          ctx.session.lang,
        );
        await ctx.editMessageText(districtMessage[ctx.session.lang], {
          reply_markup: buttons,
        });
        break;
      case 'surxondaryo':
        buttons = this.buttonService.generateButtons(
          surxandaryaCityKeys[ctx.session.lang],
          0,
          ctx.session.lang,
        );
        await ctx.editMessageText(districtMessage[ctx.session.lang], {
          reply_markup: buttons,
        });
        break;
      case 'qoraqalpogiston':
        buttons = this.buttonService.generateButtons(
          qashqadaryaCityKeys[ctx.session.lang],
          0,
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
}
