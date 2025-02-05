import { InjectRepository } from '@nestjs/typeorm';
import { Scene, SceneEnter, On } from 'nestjs-telegraf';
import {
  generousNameMessage,
  generousAddressMessage,
  mainMenuKeys,
  mainMessage,
  PhoneNumberMessages,
  phoneNumberKeys,
} from 'src/common/constants';
import { ContextType } from 'src/common/';
import { UsersEntity, UsersRepository } from 'src/core';

@Scene('registerAsGenerous')
export class RegisterAsGenerous {
  constructor(
    @InjectRepository(UsersEntity) private readonly userRepo: UsersRepository,
  ) {}
  @SceneEnter()
  async onEnter(ctx: ContextType) {
    await ctx.editMessageText(generousNameMessage[ctx.session.lang]);
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
    await ctx.reply(generousAddressMessage[ctx.session.lang]);
  }

  @On('text')
  async textHandler(ctx: ContextType) {
    if ('text' in ctx.message) {
      const text = ctx.message.text;
      console.log(text);
      await ctx.reply(mainMessage[ctx.session.lang], {
        reply_markup: mainMenuKeys[ctx.session.lang],
      });
      await ctx.scene.leave();
    }
  }
}
