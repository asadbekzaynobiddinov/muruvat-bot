import { UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Update, Action, Ctx } from 'nestjs-telegraf';
import { ContextType, Role } from 'src/common';
import {
  adminMenu,
  backToViewGenerousesForAdmin,
  genereouKeysForAdmin,
  mainMessageForAdmin,
  patientsKeysForAdmin,
} from 'src/common/constants/admin';
import { AdminGuard } from 'src/common/guard/admin.guard';
import { LastMessageGuard } from 'src/common/guard/lastMessage.guard';
import {
  PatientsEntity,
  PatientsRepository,
  UsersEntity,
  UsersRepository,
} from 'src/core';
import { Markup } from 'telegraf';
import { ButtonsService } from '../../button/button.service';

@Update()
@UseGuards(LastMessageGuard, AdminGuard)
export class ActionsService {
  constructor(
    @InjectRepository(PatientsEntity)
    private readonly patientRepo: PatientsRepository,
    @InjectRepository(UsersEntity) private readonly userRepo: UsersRepository,
    private readonly buttons: ButtonsService,
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
    await ctx.scene.enter('SearchGenerousForAdminByName');
  }

  @Action('searchGenerousByPhone')
  async searchGenerousByPhone(@Ctx() ctx: ContextType) {
    await ctx.scene.enter('SearchGenerousForAdminByPhone');
  }

  @Action('searchAllGenerousForAdmin')
  async searchAllGenerousForAdmin(@Ctx() ctx: ContextType) {
    const result = await this.buttons.generateGenerousButtonsForAdmin(
      {},
      1,
      'generousForAdminAll',
      'generousForAdminAllPage',
    );
    if (!result) {
      await ctx.answerCbQuery('Sahiylar topilmadi', { show_alert: true });
      return;
    }
    await ctx.editMessageText(result.text, {
      reply_markup: {
        inline_keyboard: [
          ...result.buttons,
          ...backToViewGenerousesForAdmin.inline_keyboard,
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

  @Action(/acceptPostAsAdmin/)
  async acceptPostAsAdmin(@Ctx() ctx: ContextType) {
    const [, id] = (ctx.update as any).callback_query.data.split('=');
    const caption =
      (ctx.callbackQuery.message as any).caption + '\nTasdiqlngan ✅';
    await this.patientRepo.update({ id }, { is_available: true });
    await ctx.editMessageCaption(caption);
  }

  @Action(/rejectPostAsAdmin/)
  async rejectPostAsAdmin(@Ctx() ctx: ContextType) {
    const [, id] = (ctx.update as any).callback_query.data.split('=');
    const caption =
      (ctx.callbackQuery.message as any).caption + '\nBekor qilingan ❌';
    await this.patientRepo.delete(id);
    await ctx.editMessageCaption(caption);
  }

  @Action('backToViewGenerousesForAdmin')
  async backToViewGenerousesForAdmin(@Ctx() ctx: ContextType) {
    await ctx.editMessageText(mainMessageForAdmin, {
      reply_markup: genereouKeysForAdmin,
    });
  }

  // View Generouses information

  @Action(/generousForAdminByName/)
  async generousForAdminByName(@Ctx() ctx: ContextType) {
    const [, id] = (ctx.update as any).callback_query.data.split('=');
    const genereous = await this.userRepo.findOne({
      where: { id, role: Role.GENEROUS },
    });
    const message =
      `Ismi: ${genereous.name}\n` +
      `Raqami: <code>${genereous.phone_number}</code>\n` +
      `Viloyati: ${genereous.region.charAt(0).toUpperCase() + genereous.region.slice(1)}\n` +
      `Tumani: ${genereous.district.charAt(0).toUpperCase() + genereous.district.slice(1)}`;
    await ctx.editMessageText(message, {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [
            Markup.button.callback(
              'Habar yuborish',
              `sendMessageAsAdmin=${genereous.telegram_id}`,
            ),
          ],
          [
            Markup.button.callback(
              '🔙 Ortga qaytish',
              'backToGenerousSearchByNameForAdmin',
            ),
          ],
        ],
      },
    });
  }

  @Action('backToGenerousSearchByNameForAdmin')
  async backToGenerousSearchByNameForAdmin(@Ctx() ctx: ContextType) {
    const result = await this.buttons.generateGenerousButtonsForAdmin(
      { name: ctx.session.search.name },
      +ctx.session.search.page || 1,
      'generousForAdminByName',
      'generousForAdminByNamePage',
    );

    if (!result) {
      await ctx.reply(`${ctx.session.search.name} ismli sahiy topilmadi`);
      ctx.session.lastMessage = await ctx.reply(mainMessageForAdmin, {
        reply_markup: adminMenu,
      });
      await ctx.scene.leave();
      return;
    }
    ctx.session.search.page = ctx.session.search.page || 1;
    ctx.session.lastMessage = await ctx.editMessageText(result.text, {
      reply_markup: {
        inline_keyboard: [
          ...result.buttons,
          ...backToViewGenerousesForAdmin.inline_keyboard,
        ],
      },
    });
  }

  @Action(/generousForAdminByNamePage/)
  async generousForAdminByNamePage(@Ctx() ctx: ContextType) {
    const [, page] = (ctx.update as any).callback_query.data.split('=');
    const result = await this.buttons.generateGenerousButtonsForAdmin(
      { name: ctx.session.search.name },
      +page,
      'generousForAdminByName',
      'generousForAdminByNamePage',
    );
    if (!result) {
      await ctx.answerCbQuery('Sayihlar topilmadi', {
        show_alert: true,
      });
      return;
    }
    await ctx.editMessageText(result.text, {
      reply_markup: {
        inline_keyboard: [
          ...result.buttons,
          ...backToViewGenerousesForAdmin.inline_keyboard,
        ],
      },
    });
  }

  @Action(/generousForAdminByPhone/)
  async generousForAdminByPhone(@Ctx() ctx: ContextType) {
    const [, id] = (ctx.update as any).callback_query.data.split('=');
    const genereous = await this.userRepo.findOne({
      where: { id, role: Role.GENEROUS },
    });
    const message =
      `Ismi: ${genereous.name}\n` +
      `Raqami: <code>${genereous.phone_number}</code>\n` +
      `Viloyati: ${genereous.region.charAt(0).toUpperCase() + genereous.region.slice(1)}\n` +
      `Tumani: ${genereous.district.charAt(0).toUpperCase() + genereous.district.slice(1)}`;
    await ctx.editMessageText(message, {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [
            Markup.button.callback(
              'Habar yuborish',
              `sendMessageAsAdmin=${genereous.telegram_id}`,
            ),
          ],
          [
            Markup.button.callback(
              '🔙 Ortga qaytish',
              'backToGenerousSearchByPhoneForAdmin',
            ),
          ],
        ],
      },
    });
  }

  @Action('backToGenerousSearchByPhoneForAdmin')
  async backToGenerousSearchByPhoneForAdmin(@Ctx() ctx: ContextType) {
    const result = await this.buttons.generateGenerousButtonsForAdmin(
      { phone_number: ctx.session.search.phone_number },
      +ctx.session.search.page || 1,
      'generousForAdminByPhone',
      'generousForAdminByPhonePage',
    );

    if (!result) {
      await ctx.reply(
        `${ctx.session.search.phone_number} raqamli sahiy topilmadi`,
      );
      ctx.session.lastMessage = await ctx.reply(mainMessageForAdmin, {
        reply_markup: adminMenu,
      });
      await ctx.scene.leave();
      return;
    }
    ctx.session.search.page = ctx.session.search.page || 1;
    ctx.session.lastMessage = await ctx.editMessageText(result.text, {
      reply_markup: {
        inline_keyboard: [
          ...result.buttons,
          ...backToViewGenerousesForAdmin.inline_keyboard,
        ],
      },
    });
  }

  @Action(/generousForAdminByPhonePage/)
  async generousForAdminByPhonePage(@Ctx() ctx: ContextType) {
    const [, page] = (ctx.update as any).callback_query.data.split('=');
    const result = await this.buttons.generateGenerousButtonsForAdmin(
      { phone_number: ctx.session.search.phone_number },
      +page,
      'generousForAdminByPhone',
      'generousForAdminByPhonePage',
    );
    if (!result) {
      await ctx.answerCbQuery('Sayihlar topilmadi', {
        show_alert: true,
      });
      return;
    }
    await ctx.editMessageText(result.text, {
      reply_markup: {
        inline_keyboard: [
          ...result.buttons,
          ...backToViewGenerousesForAdmin.inline_keyboard,
        ],
      },
    });
  }

  @Action(/generousForAdminAll/)
  async generousForAdminAll(@Ctx() ctx: ContextType) {
    const [, id] = (ctx.update as any).callback_query.data.split('=');
    const genereous = await this.userRepo.findOne({
      where: { id, role: Role.GENEROUS },
    });
    const message =
      `Ismi: ${genereous.name}\n` +
      `Raqami: <code>${genereous.phone_number}</code>\n` +
      `Viloyati: ${genereous.region.charAt(0).toUpperCase() + genereous.region.slice(1)}\n` +
      `Tumani: ${genereous.district.charAt(0).toUpperCase() + genereous.district.slice(1)}`;
    await ctx.editMessageText(message, {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [
            Markup.button.callback(
              'Habar yuborish',
              `sendMessageAsAdmin=${genereous.telegram_id}`,
            ),
          ],
          [
            Markup.button.callback(
              '🔙 Ortga qaytish',
              'backToGenerousSearchAllForAdmin',
            ),
          ],
        ],
      },
    });
  }

  @Action('backToGenerousSearchAllForAdmin')
  async backToGenerousSearchAllForAdmin(@Ctx() ctx: ContextType) {
    const result = await this.buttons.generateGenerousButtonsForAdmin(
      {},
      +ctx.session.search.page || 1,
      'generousForAdminAll',
      'generousForAdminAllPage',
    );

    if (!result) {
      await ctx.reply(`Sahiylar topilmadi`);
      ctx.session.lastMessage = await ctx.reply(mainMessageForAdmin, {
        reply_markup: adminMenu,
      });
      await ctx.scene.leave();
      return;
    }
    ctx.session.search.page = ctx.session.search.page || 1;
    ctx.session.lastMessage = await ctx.editMessageText(result.text, {
      reply_markup: {
        inline_keyboard: [
          ...result.buttons,
          ...backToViewGenerousesForAdmin.inline_keyboard,
        ],
      },
    });
  }

  @Action(/generousForAdminAllPage/)
  async generousForAdminAllPage(@Ctx() ctx: ContextType) {
    const [, page] = (ctx.update as any).callback_query.data.split('=');
    const result = await this.buttons.generateGenerousButtonsForAdmin(
      { name: ctx.session.search.name },
      +page,
      'generousForAdminAll',
      'generousForAdminAllPage',
    );
    if (!result) {
      await ctx.answerCbQuery('Sayihlar topilmadi', {
        show_alert: true,
      });
      return;
    }
    await ctx.editMessageText(result.text, {
      reply_markup: {
        inline_keyboard: [
          ...result.buttons,
          ...backToViewGenerousesForAdmin.inline_keyboard,
        ],
      },
    });
  }

  // View PAtients Information

  
}
