import { InjectRepository } from '@nestjs/typeorm';
import { Action, Ctx, On, Scene, SceneEnter } from 'nestjs-telegraf';
import { ContextType } from 'src/common';
import {
  askRegionMessage,
  phoneNumberKeys,
  PhoneNumberMessages,
  regionMessage,
} from 'src/common/constants';
import { askNameMessage, regionKeys } from 'src/common';
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
}
