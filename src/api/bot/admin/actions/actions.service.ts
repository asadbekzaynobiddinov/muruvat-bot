import { UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Update, Action, Ctx } from 'nestjs-telegraf';
import { ContextType, Genders, Role } from 'src/common';
import {
  adminMenu,
  ageKeysForAdmin,
  backToAgesForAdmin,
  backToDistrictsForAdmin,
  backToGendersFromAgeForAdmin,
  backToGendersFromSizeForAdmin,
  backToRegionsForAdmin,
  backToSizeForAdmin,
  backToViewGenerousesForAdmin,
  backToViewPatientsForAdmin,
  gendersForAgeForAdmin,
  gendersForSizeForAdmin,
  genereouKeysForAdmin,
  mainMessageForAdmin,
  patientsKeysForAdmin,
  sizeKeysForAdmin,
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

  // @Action('patientsByNameOrPhone')
  // async patientsByNameOrPhone(@Ctx() ctx: ContextType) {
  //   await ctx.editMessageText('Endi yoziladi', {
  //     reply_markup: {
  //       inline_keyboard: [
  //         [Markup.button.callback('Orqaga', 'backToAdminMenu')],
  //       ],
  //     },
  //   });
  // }

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
    ctx.session.search.page = +page;
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
    ctx.session.search.page = +page;
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
    ctx.session.search.page = +page;
    await ctx.editMessageText(result.text, {
      reply_markup: {
        inline_keyboard: [
          ...result.buttons,
          ...backToViewGenerousesForAdmin.inline_keyboard,
        ],
      },
    });
  }

  @Action(/sendMessageAsAdmin/)
  async sendMessageAsAdmin(@Ctx() ctx: ContextType) {
    const [, id] = (ctx.update as any).callback_query.data.split('=');
    ctx.session.userId = id;
    await ctx.scene.enter('sendMessage');
  }

  // View PAtients Information

  @Action('backToViewPatientsForAdmin')
  async backToViewPatientsForAdmin(@Ctx() ctx: ContextType) {
    await ctx.editMessageText(mainMessageForAdmin, {
      reply_markup: patientsKeysForAdmin,
    });
  }

  // All Patients

  @Action('allPatientsForAdmin')
  async allPatientsForAdmin(@Ctx() ctx: ContextType) {
    const result = await this.buttons.generatePatientsButtons(
      {},
      1,
      'patientsForAdminAll',
      'patientsForAdminAllPage',
    );
    if (!result) {
      await ctx.answerCbQuery('Sabrlilar mavjud emas', { show_alert: true });
      return;
    }
    ctx.session.search.page = 1;
    await ctx.editMessageText(result.text, {
      reply_markup: {
        inline_keyboard: [
          ...result.buttons,
          ...backToViewPatientsForAdmin.inline_keyboard,
        ],
      },
    });
  }

  @Action(/patientsForAdminAll/)
  async patientsForAdminAll(@Ctx() ctx: ContextType) {
    const [, id] = (ctx.update as any).callback_query.data.split('=');
    const patient = await this.patientRepo.findOne({
      where: { id, is_available: true },
      relations: ['user'],
    });
    const message =
      `Ismi: ${patient.name}\n` +
      `Yoshi: ${patient.age}\n` +
      `Bo'yi: ${patient.height}\n` +
      `O'lchami: ${patient.size ? patient.size : 'yoshga qarab'}\n` +
      `Viloyati: ${patient.region.charAt(0).toUpperCase() + patient.region.slice(1)}\n` +
      `Tumani: ${patient.district.charAt(0).toUpperCase() + patient.district.slice(1)}\n` +
      `Raqami: <code>${patient.user.phone_number || ''}</code>\n` +
      `Kerakli narsalar: ${patient.stuff}`;

    switch (patient.media.type) {
      case 'VIDEO':
        await ctx.deleteMessage();
        ctx.session.lastMessage = await ctx.sendVideo(patient.media.file_id, {
          caption: message,
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [Markup.button.callback('Yopish', `close=${patient.id}`)],
              [
                Markup.button.callback(
                  '🔙 Ortga qaytish',
                  'backToAllPatientsForAdmin',
                ),
              ],
            ],
          },
        });
        break;
      case 'PHOTO':
        await ctx.deleteMessage();
        ctx.session.lastMessage = await ctx.sendPhoto(patient.media.file_id, {
          caption: message,
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [Markup.button.callback('Yopish', `close=${patient.id}`)],
              [
                Markup.button.callback(
                  '🔙 Ortga qaytish',
                  'backToAllPatientsForAdmin',
                ),
              ],
            ],
          },
        });
        break;
    }
    // await ctx.editMessageText(message, {
    //   parse_mode: 'HTML',
    //   reply_markup: {
    //     inline_keyboard: [
    //       [Markup.button.callback('Yopish', `close=${patient.id}`)],
    //       [
    //         Markup.button.callback(
    //           '🔙 Ortga qaytish',
    //           'backToAllPatientsForAdmin',
    //         ),
    //       ],
    //     ],
    //   },
    // });
  }

  @Action('backToAllPatientsForAdmin')
  async backToAllPatientsForAdmin(@Ctx() ctx: ContextType) {
    const result = await this.buttons.generatePatientsButtons(
      {},
      +ctx.session.search.page || 1,
      'patientsForAdminAll',
      'patientsForAdminAllPage',
    );
    if (!result) {
      await ctx.answerCbQuery('Sabrlilar mavjud emas', { show_alert: true });
      return;
    }
    ctx.session.search.page = 1;
    await ctx.deleteMessage();
    ctx.session.lastMessage = await ctx.reply(result.text, {
      reply_markup: {
        inline_keyboard: [
          ...result.buttons,
          ...backToViewPatientsForAdmin.inline_keyboard,
        ],
      },
    });
  }

  @Action(/patientsForAdminAllPage/)
  async patientsForAdminAllPage(@Ctx() ctx: ContextType) {
    const [, page] = (ctx.update as any).callback_query.data.split('=');
    const result = await this.buttons.generatePatientsButtons(
      {},
      +page || 1,
      'patientsForAdminAll',
      'patientsForAdminAllPage',
    );
    if (!result) {
      await ctx.answerCbQuery('Sabrlilar topilmadi', { show_alert: true });
      return;
    }
    ctx.session.search.page = +page || 1;
    await ctx.editMessageText(mainMessageForAdmin, {
      reply_markup: {
        inline_keyboard: [
          ...result.buttons,
          ...backToViewPatientsForAdmin.inline_keyboard,
        ],
      },
    });
  }

  // By Location

  @Action('patientsByLocationForAdmin')
  async patientsByLocationForAdmin(@Ctx() ctx: ContextType) {
    const buttons = this.buttons.generateRegionButtons(
      0,
      'uz',
      'patientByRegionForAdmin',
    );
    ctx.session.adminNavigation.RegionPage = 0;
    await ctx.editMessageText(mainMessageForAdmin, {
      reply_markup: {
        inline_keyboard: [
          ...buttons.inline_keyboard,
          ...backToViewPatientsForAdmin.inline_keyboard,
        ],
      },
    });
  }

  @Action(/patientByRegionForAdminPage/)
  async patientByRegionForAdminPage(@Ctx() ctx: ContextType) {
    const [, page] = (ctx.update as any).callback_query.data.split('=');
    const buttons = await this.buttons.generateRegionButtons(
      +page,
      'uz',
      'patientByRegionForAdmin',
    );
    ctx.session.adminNavigation.RegionPage = +page;
    await ctx.editMessageText(mainMessageForAdmin, {
      reply_markup: {
        inline_keyboard: [
          ...buttons.inline_keyboard,
          ...backToViewPatientsForAdmin.inline_keyboard,
        ],
      },
    });
  }

  @Action(/patientByRegionForAdmin/)
  async generateDistricts(@Ctx() ctx: ContextType) {
    const [, region] = (ctx.update as any).callback_query.data.split('=');
    ctx.session.search.region = region;
    const buttons = this.buttons.generateDistrictButtons(
      region,
      0,
      'uz',
      'patientsByDistrictForAdmin',
    );
    ctx.session.adminNavigation.DistrictPage = 0;
    await ctx.editMessageText(mainMessageForAdmin, {
      reply_markup: {
        inline_keyboard: [
          ...buttons.inline_keyboard,
          ...backToRegionsForAdmin.inline_keyboard,
        ],
      },
    });
  }

  @Action(/patientsByDistrictForAdminPage/)
  async patientsByDistrictForAdminPage(@Ctx() ctx: ContextType) {
    const [, page] = (ctx.update as any).callback_query.data.split('=');
    const buttons = this.buttons.generateDistrictButtons(
      ctx.session.search.region,
      +page,
      'uz',
      'patientsByDistrictForAdmin',
    );
    ctx.session.adminNavigation.DistrictPage = +page;
    await ctx.editMessageText(mainMessageForAdmin, {
      reply_markup: {
        inline_keyboard: [
          ...buttons.inline_keyboard,
          ...backToRegionsForAdmin.inline_keyboard,
        ],
      },
    });
  }

  @Action('backToRegionsForAdmin')
  async backToRegionsForAdmin(@Ctx() ctx: ContextType) {
    const buttons = this.buttons.generateRegionButtons(
      ctx.session.adminNavigation.RegionPage,
      'uz',
      'patientByRegionForAdmin',
    );
    await ctx.editMessageText(mainMessageForAdmin, {
      reply_markup: {
        inline_keyboard: [
          ...buttons.inline_keyboard,
          ...backToViewPatientsForAdmin.inline_keyboard,
        ],
      },
    });
  }

  @Action(/patientsByDistrictForAdmin/)
  async patientsByDistrictForAdmin(@Ctx() ctx: ContextType) {
    const [, district] = (ctx.update as any).callback_query.data.split('=');
    ctx.session.search.district = district;
    const result = await this.buttons.generatePatientsButtons(
      {
        region: ctx.session.search.region,
        district,
      },
      1,
      'vievPatientByLocationForAdmin',
      'patientNavForAdminByRegion',
    );
    if (!result) {
      await ctx.answerCbQuery('Sabrilar topilmadi', { show_alert: true });
      return;
    }
    await ctx.editMessageText(result.text, {
      reply_markup: {
        inline_keyboard: [
          ...result.buttons,
          ...backToDistrictsForAdmin.inline_keyboard,
        ],
      },
    });
  }

  @Action('backToDistrictsForAdmin')
  async backToDistrictsForAdmin(@Ctx() ctx: ContextType) {
    const buttons = this.buttons.generateDistrictButtons(
      ctx.session.search.region,
      +ctx.session.adminNavigation.DistrictPage || 0,
      'uz',
      'patientsByDistrictForAdmin',
    );
    await ctx.editMessageText(mainMessageForAdmin, {
      reply_markup: {
        inline_keyboard: [
          ...buttons.inline_keyboard,
          ...backToRegionsForAdmin.inline_keyboard,
        ],
      },
    });
  }

  @Action(/vievPatientByLocationForAdmin/)
  async vievPatientByLocationForAdmin(@Ctx() ctx: ContextType) {
    const [, id] = (ctx.update as any).callback_query.data.split('=');
    const patient = await this.patientRepo.findOne({
      where: { id },
      relations: ['user'],
    });
    const message =
      `Ismi: ${patient.name}\n` +
      `Yoshi: ${patient.age}\n` +
      `Bo'yi: ${patient.height}\n` +
      `O'lchami: ${patient.size ? patient.size : 'yoshga qarab'}\n` +
      `Viloyati: ${patient.region.charAt(0).toUpperCase() + patient.region.slice(1)}\n` +
      `Tumani: ${patient.district.charAt(0).toUpperCase() + patient.district.slice(1)}\n` +
      `Raqami: <code>${patient.user.phone_number || ''}</code>\n` +
      `Kerakli narsalar: ${patient.stuff}`;

    switch (patient.media.type) {
      case 'VIDEO':
        await ctx.deleteMessage();
        ctx.session.lastMessage = await ctx.sendVideo(patient.media.file_id, {
          caption: message,
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [Markup.button.callback('Yopish', `close=${patient.id}`)],
              [
                Markup.button.callback(
                  '🔙 Ortga qaytish',
                  'backToAllPatientsByRegionForAdmin',
                ),
              ],
            ],
          },
        });
        break;
      case 'PHOTO':
        await ctx.deleteMessage();
        ctx.session.lastMessage = await ctx.sendPhoto(patient.media.file_id, {
          caption: message,
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [Markup.button.callback('Yopish', `close=${patient.id}`)],
              [
                Markup.button.callback(
                  '🔙 Ortga qaytish',
                  'backToAllPatientsByRegionForAdmin',
                ),
              ],
            ],
          },
        });
        break;
    }
    // await ctx.editMessageText(message, {
    //   parse_mode: 'HTML',
    //   reply_markup: {
    //     inline_keyboard: [
    //       [Markup.button.callback('Yopish', `close=${patient.id}`)],
    //       [
    //         Markup.button.callback(
    //           '🔙 Ortga qaytish',
    //           'backToAllPatientsByRegionForAdmin',
    //         ),
    //       ],
    //     ],
    //   },
    // });
  }

  @Action('backToAllPatientsByRegionForAdmin')
  async backToAllPatientsByRegionForAdmin(@Ctx() ctx: ContextType) {
    const result = await this.buttons.generatePatientsButtons(
      {
        region: ctx.session.search.region,
        district: ctx.session.search.district,
      },
      +ctx.session.search.page || 1,
      'vievPatientByLocationForAdmin',
      'patientNavForAdminByRegion',
    );
    if (!result) {
      await ctx.answerCbQuery('Sabrilar topilmadi', { show_alert: true });
      return;
    }
    await ctx.deleteMessage();
    ctx.session.lastMessage = await ctx.reply(result.text, {
      reply_markup: {
        inline_keyboard: [
          ...result.buttons,
          ...backToDistrictsForAdmin.inline_keyboard,
        ],
      },
    });
  }

  @Action(/patientNavForAdminByRegion/)
  async patientNavForAdminByRegion(@Ctx() ctx: ContextType) {
    const [, page] = (ctx.update as any).callback_query.data.split('=');
    const result = await this.buttons.generatePatientsButtons(
      {
        region: ctx.session.search.region,
        district: ctx.session.search.district,
      },
      +page || 1,
      'vievPatientByLocationForAdmin',
      'patientNavForAdminByRegion',
    );
    if (!result) {
      await ctx.answerCbQuery('Sabrilar topilmadi', { show_alert: true });
      return;
    }
    ctx.session.search.page = +page || 1;
    await ctx.editMessageText(result.text, {
      reply_markup: {
        inline_keyboard: [
          ...result.buttons,
          ...backToDistrictsForAdmin.inline_keyboard,
        ],
      },
    });
  }

  //By Gender And Age

  @Action('patientsByGenderAgeForAdmin')
  async patientsByGenderAgeForAdmin(@Ctx() ctx: ContextType) {
    await ctx.editMessageText(mainMessageForAdmin, {
      reply_markup: {
        inline_keyboard: [
          ...gendersForAgeForAdmin.inline_keyboard,
          ...backToViewPatientsForAdmin.inline_keyboard,
        ],
      },
    });
  }

  @Action(/genAndAgeForAdmin/)
  async genderForSizeForAdmin(@Ctx() ctx: ContextType) {
    const [, gender] = (ctx.update as any).callback_query.data.split('_');
    ctx.session.search.gender = gender;
    console.log(gender);
    await ctx.editMessageText(mainMessageForAdmin, {
      reply_markup: {
        inline_keyboard: [
          ...ageKeysForAdmin.inline_keyboard,
          ...backToGendersFromAgeForAdmin.inline_keyboard,
        ],
      },
    });
  }

  @Action('backToAgesForAdmin')
  async backToAgesForAdmin(@Ctx() ctx: ContextType) {
    await ctx.editMessageText(mainMessageForAdmin, {
      reply_markup: {
        inline_keyboard: [
          ...ageKeysForAdmin.inline_keyboard,
          ...backToGendersFromAgeForAdmin.inline_keyboard,
        ],
      },
    });
  }

  @Action('backToGendersFromAgeForAdmin')
  async backToGendersFromAgeForAdmin(@Ctx() ctx: ContextType) {
    await ctx.editMessageText(mainMessageForAdmin, {
      reply_markup: {
        inline_keyboard: [
          ...gendersForAgeForAdmin.inline_keyboard,
          ...backToViewPatientsForAdmin.inline_keyboard,
        ],
      },
    });
  }

  @Action(/searchAgeForAdmin/)
  async searchAgeForAdmin(@Ctx() ctx: ContextType) {
    const [, down, up] = (ctx.update as any).callback_query.data.split('_');
    ctx.session.search.down = down;
    ctx.session.search.up = up;
    const result = await this.buttons.generatePatientsButtons(
      {
        gender: ctx.session.search.gender as Genders,
        age: [+ctx.session.search.down, +ctx.session.search.up],
      },
      1,
      'viewPatientsForAdminByAge',
      'viewPatientsForAdminByAgePage',
    );
    if (!result) {
      await ctx.answerCbQuery('Sabrlilar topilmadi');
      return;
    }
    ctx.session.search.page = 1;
    await ctx.editMessageText(result.text, {
      reply_markup: {
        inline_keyboard: [
          ...result.buttons,
          ...backToAgesForAdmin.inline_keyboard,
        ],
      },
    });
  }

  @Action(/viewPatientsForAdminByAgePage/)
  async viewPatientsForAdminByAgePage(@Ctx() ctx: ContextType) {
    const [, page] = (ctx.update as any).callback_query.data.split('=');
    const result = await this.buttons.generatePatientsButtons(
      {
        gender: ctx.session.search.gender as Genders,
        age: [+ctx.session.search.down, +ctx.session.search.up],
      },
      +page || 1,
      'viewPatientsForAdminByAge',
      'viewPatientsForAdminByAgePage',
    );
    if (!result) {
      await ctx.answerCbQuery('Sabrlilar topilmadi');
      return;
    }
    ctx.session.search.page = +page || 1;
    await ctx.editMessageText(result.text, {
      reply_markup: {
        inline_keyboard: [
          ...result.buttons,
          ...backToAgesForAdmin.inline_keyboard,
        ],
      },
    });
  }

  @Action(/viewPatientsForAdminByAge/)
  async viewPatientsForAdminByAge(@Ctx() ctx: ContextType) {
    const [, id] = (ctx.update as any).callback_query.data.split('=');
    const patient = await this.patientRepo.findOne({
      where: { id },
      relations: ['user'],
    });
    const message =
      `Ismi: ${patient.name}\n` +
      `Yoshi: ${patient.age}\n` +
      `Bo'yi: ${patient.height}\n` +
      `O'lchami: ${patient.size ? patient.size : 'yoshga qarab'}\n` +
      `Viloyati: ${patient.region.charAt(0).toUpperCase() + patient.region.slice(1)}\n` +
      `Tumani: ${patient.district.charAt(0).toUpperCase() + patient.district.slice(1)}\n` +
      `Raqami: <code>${patient.user.phone_number || ''}</code>\n` +
      `Kerakli narsalar: ${patient.stuff}`;

    switch (patient.media.type) {
      case 'VIDEO':
        await ctx.deleteMessage();
        ctx.session.lastMessage = await ctx.sendVideo(patient.media.file_id, {
          caption: message,
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [Markup.button.callback('Yopish', `close=${patient.id}`)],
              [
                Markup.button.callback(
                  '🔙 Ortga qaytish',
                  'backToAllPatientsByAgeForAdmin',
                ),
              ],
            ],
          },
        });
        break;
      case 'PHOTO':
        await ctx.deleteMessage();
        ctx.session.lastMessage = await ctx.sendPhoto(patient.media.file_id, {
          caption: message,
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [Markup.button.callback('Yopish', `close=${patient.id}`)],
              [
                Markup.button.callback(
                  '🔙 Ortga qaytish',
                  'backToAllPatientsByAgeForAdmin',
                ),
              ],
            ],
          },
        });
        break;
    }
  }

  @Action('backToAllPatientsByAgeForAdmin')
  async backToAllPatientsByAgeForAdmin(@Ctx() ctx: ContextType) {
    const result = await this.buttons.generatePatientsButtons(
      {
        gender: ctx.session.search.gender as Genders,
        age: [+ctx.session.search.down, +ctx.session.search.up],
      },
      +ctx.session.search.page || 1,
      'viewPatientsForAdminByAge',
      'viewPatientsForAdminByAgePage',
    );
    if (!result) {
      await ctx.answerCbQuery('Sabrlilar mavjud emas', { show_alert: true });
      return;
    }
    ctx.session.search.page = 1;
    await ctx.deleteMessage();
    ctx.session.lastMessage = await ctx.reply(result.text, {
      reply_markup: {
        inline_keyboard: [
          ...result.buttons,
          ...backToAgesForAdmin.inline_keyboard,
        ],
      },
    });
  }

  // By Gender And Size

  @Action('patientsByGenderSizeForAdmin')
  async patientsByGenderSizeForAdmin(@Ctx() ctx: ContextType) {
    await ctx.editMessageText(mainMessageForAdmin, {
      reply_markup: {
        inline_keyboard: [
          ...gendersForSizeForAdmin.inline_keyboard,
          ...backToViewPatientsForAdmin.inline_keyboard,
        ],
      },
    });
  }

  @Action(/genAndSizeForAdmin/)
  async genAndSizeForAdmin(@Ctx() ctx: ContextType) {
    const [, gender] = (ctx.update as any).callback_query.data.split('_');
    ctx.session.search.gender = gender;
    console.log(gender);
    await ctx.editMessageText(mainMessageForAdmin, {
      reply_markup: {
        inline_keyboard: [
          ...sizeKeysForAdmin.inline_keyboard,
          ...backToGendersFromSizeForAdmin.inline_keyboard,
        ],
      },
    });
  }

  @Action('backToSizeForAdmin')
  async backToSizeForAdmin(@Ctx() ctx: ContextType) {
    await ctx.editMessageText(mainMessageForAdmin, {
      reply_markup: {
        inline_keyboard: [
          ...sizeKeysForAdmin.inline_keyboard,
          ...backToGendersFromSizeForAdmin.inline_keyboard,
        ],
      },
    });
  }

  @Action('backToGendersFromSizeForAdmin')
  async backToGendersFromSizeForAdmin(@Ctx() ctx: ContextType) {
    await ctx.editMessageText(mainMessageForAdmin, {
      reply_markup: {
        inline_keyboard: [
          ...gendersForSizeForAdmin.inline_keyboard,
          ...backToViewPatientsForAdmin.inline_keyboard,
        ],
      },
    });
  }

  @Action(/sizeForAdmin/)
  async sizeForAdmin(@Ctx() ctx: ContextType) {
    const [, size] = (ctx.update as any).callback_query.data.split('_');
    ctx.session.search.size = size;
    const result = await this.buttons.generatePatientsButtons(
      {
        gender: ctx.session.search.gender as Genders,
        age: [+ctx.session.search.down, +ctx.session.search.up],
      },
      1,
      'viewPatientsForAdminBySize',
      'viewPatientsForAdminBySizePage',
    );
    if (!result) {
      await ctx.answerCbQuery('Sabrlilar topilmadi');
      return;
    }
    ctx.session.search.page = 1;
    await ctx.editMessageText(result.text, {
      reply_markup: {
        inline_keyboard: [
          ...result.buttons,
          ...backToSizeForAdmin.inline_keyboard,
        ],
      },
    });
  }

  @Action(/viewPatientsForAdminBySizePage/)
  async viewPatientsForAdminBySizePage(@Ctx() ctx: ContextType) {
    const [, page] = (ctx.update as any).callback_query.data.split('=');
    const result = await this.buttons.generatePatientsButtons(
      {
        gender: ctx.session.search.gender as Genders,
        size: ctx.session.search.size,
      },
      +page || 1,
      'viewPatientsForAdminBySize',
      'viewPatientsForAdminBySizePage',
    );
    if (!result) {
      await ctx.answerCbQuery('Sabrlilar topilmadi');
      return;
    }
    ctx.session.search.page = +page || 1;
    await ctx.editMessageText(result.text, {
      reply_markup: {
        inline_keyboard: [
          ...result.buttons,
          ...backToSizeForAdmin.inline_keyboard,
        ],
      },
    });
  }

  @Action(/viewPatientsForAdminBySize/)
  async viewPatientsForAdminBySize(@Ctx() ctx: ContextType) {
    const [, id] = (ctx.update as any).callback_query.data.split('=');
    const patient = await this.patientRepo.findOne({
      where: { id },
      relations: ['user'],
    });
    const message =
      `Ismi: ${patient.name}\n` +
      `Yoshi: ${patient.age}\n` +
      `Bo'yi: ${patient.height}\n` +
      `O'lchami: ${patient.size ? patient.size : 'yoshga qarab'}\n` +
      `Viloyati: ${patient.region.charAt(0).toUpperCase() + patient.region.slice(1)}\n` +
      `Tumani: ${patient.district.charAt(0).toUpperCase() + patient.district.slice(1)}\n` +
      `Raqami: <code>${patient.user.phone_number || ''}</code>\n` +
      `Kerakli narsalar: ${patient.stuff}`;

    switch (patient.media.type) {
      case 'VIDEO':
        await ctx.deleteMessage();
        ctx.session.lastMessage = await ctx.sendVideo(patient.media.file_id, {
          caption: message,
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [Markup.button.callback('Yopish', `close=${patient.id}`)],
              [
                Markup.button.callback(
                  '🔙 Ortga qaytish',
                  'backToAllPatientsBySizeForAdmin',
                ),
              ],
            ],
          },
        });
        break;
      case 'PHOTO':
        await ctx.deleteMessage();
        ctx.session.lastMessage = await ctx.sendPhoto(patient.media.file_id, {
          caption: message,
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [Markup.button.callback('Yopish', `close=${patient.id}`)],
              [
                Markup.button.callback(
                  '🔙 Ortga qaytish',
                  'backToAllPatientsBySizeForAdmin',
                ),
              ],
            ],
          },
        });
        break;
    }
  }

  @Action('backToAllPatientsBySizeForAdmin')
  async backToAllPatientsBySizeForAdmin(@Ctx() ctx: ContextType) {
    const result = await this.buttons.generatePatientsButtons(
      {
        gender: ctx.session.search.gender as Genders,
        size: ctx.session.search.size,
      },
      +ctx.session.search.page || 1,
      'viewPatientsForAdminBySize',
      'viewPatientsForAdminBySizePage',
    );
    if (!result) {
      await ctx.answerCbQuery('Sabrlilar mavjud emas', { show_alert: true });
      return;
    }
    ctx.session.search.page = 1;
    await ctx.deleteMessage();
    ctx.session.lastMessage = await ctx.reply(result.text, {
      reply_markup: {
        inline_keyboard: [
          ...result.buttons,
          ...backToAgesForAdmin.inline_keyboard,
        ],
      },
    });
  }

  @Action(/close/)
  async close(@Ctx() ctx: ContextType) {
    const [, id] = (ctx.update as any).callback_query.data.split('=');
    await this.patientRepo.update({ id }, { is_available: false });
    await ctx.answerCbQuery('Bu elon yopildi', { show_alert: true });
  }
}
