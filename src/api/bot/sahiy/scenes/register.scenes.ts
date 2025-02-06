import { InjectRepository } from '@nestjs/typeorm';
import { Scene, SceneEnter, On, Action } from 'nestjs-telegraf';
import {
  ContextType,
  askNameMessage,
  generousMenuKeys,
  mainMessage,
  PhoneNumberMessages,
  phoneNumberKeys,
  regionKeys,
  askRegionMessage,
} from 'src/common/';
import { UsersEntity, UsersRepository } from 'src/core';

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
  ) {}
  @SceneEnter()
  async onEnter(ctx: ContextType) {
    await ctx.reply(askRegionMessage[ctx.session.lang], {
      reply_markup: regionKeys[ctx.session.lang],
    });
  }

  @Action(/region/)
  async textHandler(ctx: ContextType) {
    const [, region] = (ctx.update as any).callback_query.data.split('_');
    console.log(region);
    await ctx.editMessageText(mainMessage[ctx.session.lang], {
      reply_markup: generousMenuKeys[ctx.session.lang],
    });
    await ctx.scene.leave();
  }
}
