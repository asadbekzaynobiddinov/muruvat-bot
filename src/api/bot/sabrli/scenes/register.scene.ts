import { InjectRepository } from '@nestjs/typeorm';
import { On, Scene, SceneEnter } from 'nestjs-telegraf';
import { ContextType } from 'src/common';
import {
  mainMessage,
  phoneNumberKeys,
  PhoneNumberMessages,
  regionMessage,
} from 'src/common/constants';
import {
  patientMenuKeys,
  patientNameMessage,
  regionKeysforPatients,
} from 'src/common/constants/sabrli';
import { UsersEntity, UsersRepository } from 'src/core';

@Scene('registerAsPatient')
export class RegisterScenes {
  constructor(
    @InjectRepository(UsersEntity) private readonly userRepo: UsersRepository,
  ) {}
  @SceneEnter()
  async onEnter(ctx: ContextType) {
    await ctx.editMessageText(patientNameMessage[ctx.session.lang]);
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
      await ctx.scene.enter('askPatientAddress');
    }
  }
}
@Scene('askPatientAddress')
export class AskPatientAddress {
  constructor(
    @InjectRepository(UsersEntity) private readonly userRepo: UsersRepository,
  ) {}
  @SceneEnter()
  async onEnter(ctx: ContextType) {
    await ctx.reply(regionMessage[ctx.session.lang], {
      reply_markup: regionKeysforPatients[ctx.session.lang],
      parse_mode: 'HTML',
    });
  }
  @On('text')
  async textHandler(ctx: ContextType) {
    if ('text' in ctx.message) {
      const text = ctx.message.text;
      console.log(text);
      await ctx.reply(mainMessage[ctx.session.lang], {
        reply_markup: patientMenuKeys[ctx.session.lang],
      });
      await ctx.scene.leave();
    }
  }
}
