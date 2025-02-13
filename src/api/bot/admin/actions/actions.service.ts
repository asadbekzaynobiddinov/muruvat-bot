import { Update, Action, Ctx } from 'nestjs-telegraf';
import { ContextType } from 'src/common';
import {
  adminMenu,
  genereouKeysForAdmin,
  mainMessageForAdmin,
  patientsKeysForAdmin,
} from 'src/common/constants/admin';
import { Markup } from 'telegraf';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity, AdminRepository } from 'src/core';

@Update()
// @UseGuards(AdminGuard)
export class ActionsService {
  constructor(
    @InjectRepository(AdminEntity) private readonly adminRepo: AdminRepository,
  ) {}
  @Action('generousesForAdmin')
  async gnerouses(@Ctx() ctx: ContextType) {
    await ctx.editMessageText(mainMessageForAdmin, {
      reply_markup: genereouKeysForAdmin,
    });
  }

  @Action('patientsForAdmin')
  async patients(@Ctx() ctx: ContextType) {
    await ctx.editMessageText(mainMessageForAdmin, {
      reply_markup: patientsKeysForAdmin,
    });
  }

  @Action('backToAdminMenu')
  async backToMenu(@Ctx() ctx: ContextType) {
    await ctx.editMessageText(mainMessageForAdmin, { reply_markup: adminMenu });
  }

  @Action('searchGenerousByNameForAdmin')
  async searchGenerousByName(@Ctx() ctx: ContextType) {
    await ctx.editMessageText('Endi yoziladi', {
      reply_markup: {
        inline_keyboard: [
          [Markup.button.callback('Orqaga', 'backToAdminMenu')],
        ],
      },
    });
  }

  @Action('searchGenerousByPhone')
  async searchGenerousByPhone(@Ctx() ctx: ContextType) {
    await ctx.editMessageText('Endi yoziladi', {
      reply_markup: {
        inline_keyboard: [
          [Markup.button.callback('Orqaga', 'backToAdminMenu')],
        ],
      },
    });
  }

  @Action('searchAllGenerousForAdmin')
  async searchAllGenerousForAdmin(@Ctx() ctx: ContextType) {
    await ctx.editMessageText('Endi yoziladi', {
      reply_markup: {
        inline_keyboard: [
          [Markup.button.callback('Orqaga', 'backToAdminMenu')],
        ],
      },
    });
  }

  @Action('allPatientsForAdmin')
  async allPatientsForAdmin(@Ctx() ctx: ContextType) {
    await ctx.editMessageText('Endi yoziladi', {
      reply_markup: {
        inline_keyboard: [
          [Markup.button.callback('Orqaga', 'backToAdminMenu')],
        ],
      },
    });
  }

  @Action('patientsByLocationForAdmin')
  async patientsByLocationForAdmin(@Ctx() ctx: ContextType) {
    await ctx.editMessageText('Endi yoziladi', {
      reply_markup: {
        inline_keyboard: [
          [Markup.button.callback('Orqaga', 'backToAdminMenu')],
        ],
      },
    });
  }

  @Action('patientsByGenderAgeForAdmin')
  async patientsByGenderAgeForAdmin(@Ctx() ctx: ContextType) {
    await ctx.editMessageText('Endi yoziladi', {
      reply_markup: {
        inline_keyboard: [
          [Markup.button.callback('Orqaga', 'backToAdminMenu')],
        ],
      },
    });
  }

  @Action('patientsByGenderSizeForAdmin')
  async patientsByGenderSizeForAdmin(@Ctx() ctx: ContextType) {
    await ctx.editMessageText('Endi yoziladi', {
      reply_markup: {
        inline_keyboard: [
          [Markup.button.callback('Orqaga', 'backToAdminMenu')],
        ],
      },
    });
  }

  @Action('patientsByNameOrPhone')
  async patientsByNameOrPhone(@Ctx() ctx: ContextType) {
    await ctx.editMessageText('Endi yoziladi', {
      reply_markup: {
        inline_keyboard: [
          [Markup.button.callback('Orqaga', 'backToAdminMenu')],
        ],
      },
    });
  }
}
