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
  // askRegionMessage,
} from 'src/common/';
import { UsersEntity, UsersRepository } from 'src/core';
import { ButtonsService } from '../../button/button.service';

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
      const text = ctx.message.text;
      console.log(text);
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
      const text = contact.phone_number;
      console.log(text);
      await ctx.scene.enter('askGenerousAddress');
    }
  }
}

@Scene('askGenerousAddress')
export class AskGenerousAddress {
  constructor(
    @InjectRepository(UsersEntity) private readonly userRepo: UsersRepository,
    private readonly buttonService: ButtonsService,
  ) {}
  @SceneEnter()
  async onEnter(ctx: ContextType) {
    // const keys = [];
    const buttons = this.buttonService.generateButtons(
      regionKeys[ctx.session.lang],
      0,
      ctx.session.lang,
    );
    await ctx.reply('Bu yerda tugmalar chiqadi', { reply_markup: buttons });
    // await ctx.reply(askRegionMessage[ctx.session.lang], {
    //   reply_markup: regionKeys[ctx.session.lang],
    // });
  }

  @Action(/page/)
  async page(@Ctx() ctx: ContextType) {
    const [, page] = (ctx.update as any).callback_query.data.split('_');
    const buttons = this.buttonService.generateButtons(
      regionKeys[ctx.session.lang],
      +page,
      ctx.session.lang,
    );
    await ctx.editMessageText('isfddsf', { reply_markup: buttons });
  }

  @Action(/region/)
  async textHandler(ctx: ContextType) {
    const [, region] = (ctx.update as any).callback_query.data.split('_');
    console.log(region);
    switch (region) {
      case 'toshken shahar':
        console.log(region);
        break;
      case 'toshkent viloyat':
        console.log(region);
        break;
      case 'samarqand':
        console.log(region);
        break;
      case 'buxoro':
        console.log(region);
        break;
      case 'andijon':
        console.log(region);
        break;
      case 'fargon':
        console.log(region);
        break;
      case 'namangan':
        console.log(region);
        break;
      case 'qashqadaryo':
        console.log(region);
        break;
      case 'jizzax':
        console.log(region);
        break;
      case 'sirdaryo':
        console.log(region);
        break;
      case 'xorazm':
        console.log(region);
        break;
      case 'navoiy':
        console.log(region);
        break;
      case 'surxondaryo':
        console.log(region);
        break;
      case 'qoraqalpogiston':
        console.log(region);
        break;
      default:
        break;
    }
    await ctx.scene.leave();
  }
}
