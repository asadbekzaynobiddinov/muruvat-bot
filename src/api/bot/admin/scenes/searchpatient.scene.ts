import { Scene, SceneEnter, On, Ctx } from 'nestjs-telegraf';
import { InjectRepository } from '@nestjs/typeorm';
import { ContextType } from 'src/common';
import { UsersEntity, UsersRepository } from 'src/core';
import {
  adminMenu,
  backToViewPatientsForAdmin,
  mainMessageForAdmin,
} from 'src/common/constants/admin';
import { ButtonsService } from '../../button/button.service';

@Scene('SearchPatientForAdminByName')
export class SearchpPatientForAdminByName {
  constructor(
    @InjectRepository(UsersEntity) private readonly userRepo: UsersRepository,
    private readonly buttonService: ButtonsService,
  ) {}

  @SceneEnter()
  async onEnter(@Ctx() ctx: ContextType) {
    await ctx.editMessageText('Sahiyning ismini kiriting: ');
  }

  @On('text')
  async onText(@Ctx() ctx: ContextType) {
    const name = (ctx.update as any).message.text;
    ctx.session.search.name = name;
    const result = await this.buttonService.generateGenerousButtonsForAdmin(
      { name },
      1,
      'patientForAdminByName',
      'patientForAdminByNamePage',
    );

    if (!result) {
      await ctx.reply(`${name} ismli sahiy topilmadi`);
      ctx.session.lastMessage = await ctx.reply(mainMessageForAdmin, {
        reply_markup: adminMenu,
      });
      await ctx.scene.leave();
      return;
    }
    ctx.session.search.page = 1;
    ctx.session.lastMessage = await ctx.reply(result.text, {
      reply_markup: {
        inline_keyboard: [
          ...result.buttons,
          ...backToViewPatientsForAdmin.inline_keyboard,
        ],
      },
    });
    await ctx.scene.leave();
  }
}

@Scene('SearchpatientForAdminByPhone')
export class SearchPatientForAdminByPhone {
  constructor(
    @InjectRepository(UsersEntity) private readonly userRepo: UsersRepository,
    private readonly buttonService: ButtonsService,
  ) {}

  @SceneEnter()
  async onEnter(@Ctx() ctx: ContextType) {
    await ctx.editMessageText('Sahiyning raqamini kiriting: ');
  }

  @On('text')
  async onText(@Ctx() ctx: ContextType) {
    const phone_number = (ctx.update as any).message.text;
    ctx.session.search.phone_number = phone_number;
    const result = await this.buttonService.generateGenerousButtonsForAdmin(
      { phone_number },
      1,
      'patientForAdminByPhone',
      'patientForAdminByPhonePage',
    );

    if (!result) {
      await ctx.reply(`${phone_number} raqamli sahiy topilmadi`);
      ctx.session.lastMessage = await ctx.reply(mainMessageForAdmin, {
        reply_markup: adminMenu,
      });
      await ctx.scene.leave();
      return;
    }
    ctx.session.search.page = 1;
    ctx.session.lastMessage = await ctx.reply(result.text, {
      reply_markup: {
        inline_keyboard: [
          ...result.buttons,
          ...backToViewPatientsForAdmin.inline_keyboard,
        ],
      },
    });
    await ctx.scene.leave();
  }
}
