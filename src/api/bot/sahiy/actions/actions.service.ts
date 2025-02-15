import { Update, Action, Ctx } from 'nestjs-telegraf';
import {
  ageKeys,
  backToAges,
  backToChanges,
  backToDistrictsForGenerous,
  backToGendersForAge,
  backToGendersForSize,
  backToGenerosMenu,
  backToRegionsForGenerous,
  backToS,
  backToViewPatients,
  ContextType,
  genderForAgeKeys,
  genderForSizeKeys,
  Genders,
  generousMenuKeys,
  setGenerousLangKeys,
  langMessages,
  mainMessage,
  neededDistrictMessage,
  neededRegionMessage,
  noPatintsMessage,
  repairKeys,
  repairMessage,
  settingsForGenerous,
  sizeKeys,
  viewPatientsKeys,
  patientsInformation,
  backToPatientsListFromRegion,
  backToPatientsListFromGenderAge,
  backToPatientsListFromGenderSize,
  backToPatientsListFromAll,
  helpFor,
  usernameFirst,
} from 'src/common';
import { ButtonsService } from '../../button/button.service';
import { InjectRepository } from '@nestjs/typeorm';
import {
  PatientsEntity,
  PatientsRepository,
  UsersEntity,
  UsersRepository,
} from 'src/core';
import { Languages } from 'src/common/enum/language';
import { UseGuards } from '@nestjs/common';
import { LastMessageGuard } from 'src/common/guard/lastMessage.guard';
import { Markup } from 'telegraf';

@Update()
@UseGuards(LastMessageGuard)
export class ActionsService {
  constructor(
    private readonly buttonService: ButtonsService,
    @InjectRepository(UsersEntity) private readonly userRepo: UsersRepository,
    @InjectRepository(PatientsEntity)
    private readonly patientsRepo: PatientsRepository,
  ) {}

  @Action('repair')
  async repair(@Ctx() ctx: ContextType) {
    await ctx.editMessageText(repairMessage[ctx.session.lang], {
      reply_markup: repairKeys[ctx.session.lang],
    });
  }

  @Action('view_patients_for_generous')
  async viewPatients(@Ctx() ctx: ContextType) {
    await ctx.editMessageText(mainMessage[ctx.session.lang], {
      reply_markup: viewPatientsKeys[ctx.session.lang],
    });
  }

  @Action('toAdminAsGenerous')
  async toAdmin(@Ctx() ctx: ContextType) {
    if (!ctx.from.username) {
      await ctx.answerCbQuery(usernameFirst[ctx.session.lang], {
        show_alert: true,
      });
      return;
    }
    ctx.scene.enter('sendReportToAdminAsGenerous');
  }

  @Action('settings_for_generous')
  async settings(@Ctx() ctx: ContextType) {
    await ctx.editMessageText(mainMessage[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: [
          ...settingsForGenerous[ctx.session.lang].inline_keyboard,
          ...backToGenerosMenu[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }

  @Action('back_to_generous_menu')
  async backToMenu(@Ctx() ctx: ContextType) {
    await ctx.editMessageText(mainMessage[ctx.session.lang], {
      reply_markup: generousMenuKeys[ctx.session.lang],
    });
  }

  @Action('patient_by_region_for_generous')
  async patientByRegion(@Ctx() ctx: ContextType) {
    const buttons = this.buttonService.generateRegionButtons(
      0,
      ctx.session.lang,
      'patientsRegionsForG',
    );
    await ctx.editMessageText(neededRegionMessage[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: [
          ...buttons.inline_keyboard,
          ...backToViewPatients[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }

  @Action(/patientsRegionsForGPage/)
  async pageRegion(@Ctx() ctx: ContextType) {
    const [, page] = (ctx.update as any).callback_query.data.split('=');
    const buttons = this.buttonService.generateRegionButtons(
      +page,
      ctx.session.lang,
      'patientsRegionsForG',
    );
    ctx.session.generousNavigation.RegionPage = +page;
    await ctx.editMessageText(neededRegionMessage[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: [
          ...buttons.inline_keyboard,
          ...backToViewPatients[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }

  @Action(/patientsRegionsForG/)
  async region(@Ctx() ctx: ContextType) {
    const [, region] = (ctx.update as any).callback_query.data.split('=');
    ctx.session.search.region = region;
    const buttons = this.buttonService.generateDistrictButtons(
      region,
      0,
      ctx.session.lang,
      'patientsDistrictForG',
    );
    await ctx.editMessageText(neededDistrictMessage[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: [
          ...buttons.inline_keyboard,
          ...backToRegionsForGenerous[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }

  @Action(/patientsDistrictForGPage/)
  async pageDistrict(@Ctx() ctx: ContextType) {
    const [, page] = (ctx.update as any).callback_query.data.split('=');
    const buttons = this.buttonService.generateDistrictButtons(
      ctx.session.search.region,
      +page,
      ctx.session.lang,
      'patientsDistrictForG',
    );
    ctx.session.generousNavigation.DistrictPage = +page;
    await ctx.editMessageText(neededDistrictMessage[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: [
          ...buttons.inline_keyboard,
          ...backToRegionsForGenerous[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }

  @Action(/patientsDistrictForG/)
  async district(@Ctx() ctx: ContextType) {
    const [, district] = (ctx.update as any).callback_query.data.split('=');
    ctx.session.search.district = district;
    const result = await this.buttonService.generatePatientsButtons(
      {
        region: ctx.session.search.region,
        district: ctx.session.search.district,
      },
      1,
      'viewPatientsForGenByRegion',
      'patNavForGenByReg',
    );
    if (!result) {
      await ctx.answerCbQuery(noPatintsMessage[ctx.session.lang], {
        show_alert: true,
      });
      return;
    }
    ctx.session.search.page = 1;
    await ctx.editMessageText(result.text, {
      reply_markup: {
        inline_keyboard: [
          ...result.buttons,
          ...backToDistrictsForGenerous[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }

  @Action(/patNavForGenByReg/)
  async viewPatientsForGenPage(@Ctx() ctx: ContextType) {
    const [, page] = (ctx.update as any).callback_query.data.split('=');
    const result = await this.buttonService.generatePatientsButtons(
      {
        region: ctx.session.search.region,
        district: ctx.session.search.district,
      },
      +page,
      'viewPatientsForGenByRegion',
      'patNavForGenByReg',
    );
    if (!result) {
      await ctx.answerCbQuery(noPatintsMessage[ctx.session.lang], {
        show_alert: true,
      });
      return;
    }
    ctx.session.search.page = +page;
    await ctx.editMessageText(result.text, {
      reply_markup: {
        inline_keyboard: [
          ...result.buttons,
          ...backToDistrictsForGenerous[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }

  @Action('backToRegForGenerous')
  async backToRegions(@Ctx() ctx: ContextType) {
    const buttons = this.buttonService.generateRegionButtons(
      ctx.session.generousNavigation.RegionPage || 0,
      ctx.session.lang,
      'patientsRegionsForG',
    );
    await ctx.editMessageText(neededRegionMessage[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: [
          ...buttons.inline_keyboard,
          ...backToViewPatients[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }

  @Action('backToDistForGenerous')
  async backToDistricts(@Ctx() ctx: ContextType) {
    const buttons = this.buttonService.generateDistrictButtons(
      ctx.session.search.region,
      ctx.session.generousNavigation.DistrictPage || 0,
      ctx.session.lang,
      'patientsDistrictForG',
    );
    await ctx.editMessageText(neededDistrictMessage[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: [
          ...buttons.inline_keyboard,
          ...backToRegionsForGenerous[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }

  @Action('back_to_view_patents')
  async backToViewPatients(@Ctx() ctx: ContextType) {
    await ctx.editMessageText(mainMessage[ctx.session.lang], {
      reply_markup: viewPatientsKeys[ctx.session.lang],
    });
  }

  @Action('change_lang_generous')
  async changeLang(@Ctx() ctx: ContextType) {
    await ctx.editMessageText(langMessages[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: [
          ...setGenerousLangKeys.inline_keyboard,
          ...backToChanges[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }

  @Action('setGenerousLangUz')
  async setUz(@Ctx() ctx: ContextType) {
    await this.userRepo.update(
      { telegram_id: `${ctx.from.id}` },
      { lang: Languages.UZ },
    );
    ctx.session.lang = Languages.UZ;
    await ctx.editMessageText(mainMessage[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: [
          ...settingsForGenerous[ctx.session.lang].inline_keyboard,
          ...backToGenerosMenu[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }

  @Action('setGenerousLangRu')
  async setRu(@Ctx() ctx: ContextType) {
    await this.userRepo.update(
      { telegram_id: `${ctx.from.id}` },
      { lang: Languages.RU },
    );
    ctx.session.lang = Languages.RU;
    await ctx.editMessageText(mainMessage[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: [
          ...settingsForGenerous[ctx.session.lang].inline_keyboard,
          ...backToGenerosMenu[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }

  @Action('setGenerousLangEn')
  async setEn(@Ctx() ctx: ContextType) {
    await this.userRepo.update(
      { telegram_id: `${ctx.from.id}` },
      { lang: Languages.EN },
    );
    ctx.session.lang = Languages.EN;
    await ctx.editMessageText(mainMessage[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: [
          ...settingsForGenerous[ctx.session.lang].inline_keyboard,
          ...backToGenerosMenu[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }

  @Action('back_to_changes')
  async bachToChhanges(@Ctx() ctx: ContextType) {
    await ctx.editMessageText(mainMessage[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: [
          ...settingsForGenerous[ctx.session.lang].inline_keyboard,
          ...backToGenerosMenu[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }

  @Action('change_phone_generous')
  async changePhone(@Ctx() ctx: ContextType) {
    await ctx.scene.enter('changeGenerousPhone');
  }

  @Action('patient_by_gender_age')
  async genderAge(@Ctx() ctx: ContextType) {
    await ctx.editMessageText(mainMessage[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: [
          ...genderForAgeKeys[ctx.session.lang].inline_keyboard,
          ...backToViewPatients[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }

  @Action('patient_by_gender_size')
  async genderSize(@Ctx() ctx: ContextType) {
    await ctx.editMessageText(mainMessage[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: [
          ...genderForSizeKeys[ctx.session.lang].inline_keyboard,
          ...backToViewPatients[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }

  @Action(/genderForAge/)
  async searchGenderForAge(@Ctx() ctx: ContextType) {
    const [, gender] = (ctx.update as any).callback_query.data.split('_');
    ctx.session.search.gender = gender;
    await ctx.editMessageText(mainMessage[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: [
          ...ageKeys[ctx.session.lang].inline_keyboard,
          ...backToGendersForAge[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }

  @Action(/genderForSize/)
  async searchGenderForSize(@Ctx() ctx: ContextType) {
    const [, gender] = (ctx.update as any).callback_query.data.split('_');
    ctx.session.search.gender = gender;
    await ctx.editMessageText(mainMessage[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: [
          ...sizeKeys.inline_keyboard,
          ...backToGendersForSize[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }

  @Action(/age/)
  async searchAge(@Ctx() ctx: ContextType) {
    const [, past, yuqori] = (ctx.update as any).callback_query.data.split('_');
    ctx.session.search.down = past;
    ctx.session.search.up = yuqori;
    const result = await this.buttonService.generatePatientsButtons(
      {
        gender: ctx.session.search.gender as Genders,
        age: [ctx.session.search.down, ctx.session.search.up],
      },
      1,
      'viewPatientsForGenByAge',
      'patNavForGenByGenAndAg',
    );
    if (!result) {
      await ctx.answerCbQuery(noPatintsMessage[ctx.session.lang], {
        show_alert: true,
      });
      return;
    }
    ctx.session.search.page = 1;
    await ctx.editMessageText(result.text, {
      reply_markup: {
        inline_keyboard: [
          ...result.buttons,
          ...backToAges[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }

  @Action(/patNavForGenByGenAndAg/)
  async patNavForGenByGenAndAg(@Ctx() ctx: ContextType) {
    const [, page] = (ctx.update as any).callback_query.data.split('=');
    const result = await this.buttonService.generatePatientsButtons(
      {
        gender: ctx.session.search.gender as Genders,
        age: [+ctx.session.search.down, +ctx.session.search.up],
      },
      +page,
      'viewPatientsForGenByAge',
      'patNavForGenByGenAndAg',
    );
    if (!result) {
      await ctx.answerCbQuery(noPatintsMessage[ctx.session.lang], {
        show_alert: true,
      });
      return;
    }
    ctx.session.search.page = +page;
    await ctx.editMessageText(result.text, {
      reply_markup: {
        inline_keyboard: [
          ...result.buttons,
          ...backToAges[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }

  @Action(/size/)
  async size(@Ctx() ctx: ContextType) {
    const [, size] = (ctx.update as any).callback_query.data.split('_');
    ctx.session.search.size = size;
    const result = await this.buttonService.generatePatientsButtons(
      {
        gender: ctx.session.search.gender as Genders,
        size: ctx.session.search.size,
      },
      1,
      'viewPatientsForGenBySize',
      'patNavForGenByGenAndSz',
    );
    if (!result) {
      await ctx.answerCbQuery(noPatintsMessage[ctx.session.lang], {
        show_alert: true,
      });
      return;
    }
    ctx.session.search.page = 1;
    await ctx.editMessageText(result.text, {
      reply_markup: {
        inline_keyboard: [
          ...result.buttons,
          ...backToS[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }

  @Action(/patNavForGenByGenAndSz/)
  async patNavForGenByGenAndSz(@Ctx() ctx: ContextType) {
    const [, page] = (ctx.update as any).callback_query.data.split('=');
    const result = await this.buttonService.generatePatientsButtons(
      {
        gender: ctx.session.search.gender as Genders,
        size: ctx.session.search.size,
      },
      +page,
      'viewPatientsForGenBySize',
      'patNavForGenByGenAndSz',
    );
    if (!result) {
      await ctx.answerCbQuery(noPatintsMessage[ctx.session.lang], {
        show_alert: true,
      });
      return;
    }
    ctx.session.search.page = +page;
    await ctx.editMessageText(result.text, {
      reply_markup: {
        inline_keyboard: [
          ...result.buttons,
          ...backToS[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }

  @Action('backToGenderForAge')
  async backToGendersForAge(@Ctx() ctx: ContextType) {
    await ctx.editMessageText(mainMessage[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: [
          ...genderForAgeKeys[ctx.session.lang].inline_keyboard,
          ...backToViewPatients[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }

  @Action('backToGenderForSize')
  async backToGendersForSize(@Ctx() ctx: ContextType) {
    await ctx.editMessageText(mainMessage[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: [
          ...genderForSizeKeys[ctx.session.lang].inline_keyboard,
          ...backToViewPatients[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }

  @Action('backToAgeForGenerous')
  async backToAges(@Ctx() ctx: ContextType) {
    await ctx.editMessageText(mainMessage[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: [
          ...ageKeys[ctx.session.lang].inline_keyboard,
          ...backToGendersForAge[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }

  @Action('backToSizeForGenerous')
  async backToSize(@Ctx() ctx: ContextType) {
    await ctx.editMessageText(mainMessage[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: [
          ...sizeKeys.inline_keyboard,
          ...backToGendersForSize[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }

  @Action('all_patients')
  async allPatients(@Ctx() ctx: ContextType) {
    const result = await this.buttonService.generatePatientsButtons(
      {},
      1,
      'viewPatientsForGenAll',
      'patNavForGenAll',
    );
    if (!result) {
      await ctx.answerCbQuery(noPatintsMessage[ctx.session.lang], {
        show_alert: true,
      });
      return;
    }
    ctx.session.search.page = 1;
    await ctx.editMessageText(result.text, {
      reply_markup: {
        inline_keyboard: [
          ...result.buttons,
          ...backToViewPatients[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }

  @Action(/patNavForGenAll/)
  async patNavForGenAll(@Ctx() ctx: ContextType) {
    const [, page] = (ctx.update as any).callback_query.data.split('=');
    const result = await this.buttonService.generatePatientsButtons(
      {},
      +page,
      'viewPatientsForGenAll',
      'patNavForGenAll',
    );
    if (!result) {
      await ctx.answerCbQuery(noPatintsMessage[ctx.session.lang], {
        show_alert: true,
      });
      return;
    }
    await ctx.editMessageText(result.text, {
      reply_markup: {
        inline_keyboard: [
          ...result.buttons,
          ...backToViewPatients[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }

  @Action(/viewPatientsForGenByRegion/)
  async viewPatientsForGen(@Ctx() ctx: ContextType) {
    const [, id] = (ctx.update as any).callback_query.data.split('=');
    const application = await this.patientsRepo.findOne({
      where: { id },
    });
    if (!application) {
      await ctx.answerCbQuery('oops', { show_alert: true });
      return;
    }
    const l = ctx.session.lang;
    const message =
      `${patientsInformation.name[l]}${application.name}\n` +
      `${patientsInformation.age[l]}${application.age}\n` +
      `${patientsInformation.height[l]}${application.height}\n` +
      `${patientsInformation.size[l]}${application.size ? application.size : patientsInformation.lookAge[l]}\n` +
      `${patientsInformation.stuff[l]}${application.stuff}\n` +
      `${patientsInformation.region[l]}${application.region.charAt(0).toUpperCase() + application.region.slice(1)}\n` +
      `${patientsInformation.district[l]}${application.district.charAt(0).toUpperCase() + application.district.slice(1)}\n`;

    switch (application.media.type) {
      case 'PHOTO':
        await ctx.deleteMessage();
        ctx.session.lastMessage = await ctx.sendPhoto(
          application.media.file_id,
          {
            caption: message,
            reply_markup: {
              inline_keyboard: [
                [
                  Markup.button.callback(
                    helpFor[ctx.session.lang],
                    `helpFor=${application.id}`,
                  ),
                ],
                ...backToPatientsListFromRegion[ctx.session.lang]
                  .inline_keyboard,
              ],
            },
          },
        );
        break;
      case 'VIDEO':
        await ctx.deleteMessage();
        ctx.session.lastMessage = await ctx.sendVideo(
          application.media.file_id,
          {
            caption: message,
            reply_markup: {
              inline_keyboard: [
                [
                  Markup.button.callback(
                    helpFor[ctx.session.lang],
                    `helpFor=${application.id}`,
                  ),
                ],
                ...backToPatientsListFromRegion[ctx.session.lang]
                  .inline_keyboard,
              ],
            },
          },
        );
        break;
    }
  }

  @Action('backToPatientsListFromRegion')
  async backToPatientsListFromRegion(@Ctx() ctx: ContextType) {
    const result = await this.buttonService.generatePatientsButtons(
      {
        region: ctx.session.search.region,
        district: ctx.session.search.district,
      },
      +ctx.session.search.page,
      'viewPatientsForGenByRegion',
      'patNavForGenByReg',
    );
    if (!result) {
      await ctx.answerCbQuery(noPatintsMessage[ctx.session.lang], {
        show_alert: true,
      });
      return;
    }
    await ctx.deleteMessage();
    ctx.session.lastMessage = await ctx.reply(result.text, {
      reply_markup: {
        inline_keyboard: [
          ...result.buttons,
          ...backToDistrictsForGenerous[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }

  @Action(/viewPatientsForGenByAge/)
  async viewPatientsForGenByAge(@Ctx() ctx: ContextType) {
    const [, id] = (ctx.update as any).callback_query.data.split('=');
    const application = await this.patientsRepo.findOne({
      where: { id },
    });
    if (!application) {
      await ctx.answerCbQuery('oops', { show_alert: true });
      return;
    }
    const l = ctx.session.lang;
    const message =
      `${patientsInformation.name[l]}${application.name}\n` +
      `${patientsInformation.age[l]}${application.age}\n` +
      `${patientsInformation.height[l]}${application.height}\n` +
      `${patientsInformation.size[l]}${application.size ? application.size : patientsInformation.lookAge[l]}\n` +
      `${patientsInformation.stuff[l]}${application.stuff}\n` +
      `${patientsInformation.region[l]}${application.region.charAt(0).toUpperCase() + application.region.slice(1)}\n` +
      `${patientsInformation.district[l]}${application.district.charAt(0).toUpperCase() + application.district.slice(1)}\n`;

    switch (application.media.type) {
      case 'PHOTO':
        await ctx.deleteMessage();
        ctx.session.lastMessage = await ctx.sendPhoto(
          application.media.file_id,
          {
            caption: message,
            reply_markup: {
              inline_keyboard: [
                [
                  Markup.button.callback(
                    helpFor[ctx.session.lang],
                    `helpFor=${application.id}`,
                  ),
                ],
                ...backToPatientsListFromGenderAge[ctx.session.lang]
                  .inline_keyboard,
              ],
            },
          },
        );
        break;
      case 'VIDEO':
        await ctx.deleteMessage();
        ctx.session.lastMessage = await ctx.sendVideo(
          application.media.file_id,
          {
            caption: message,
            reply_markup: {
              inline_keyboard: [
                [
                  Markup.button.callback(
                    helpFor[ctx.session.lang],
                    `helpFor=${application.id}`,
                  ),
                ],
                ...backToPatientsListFromGenderAge[ctx.session.lang]
                  .inline_keyboard,
              ],
            },
          },
        );
        break;
    }
  }

  @Action('backToPatientsListFromGenderAge')
  async backToPatientsListFromGenderAge(@Ctx() ctx: ContextType) {
    const result = await this.buttonService.generatePatientsButtons(
      {
        gender: ctx.session.search.gender as Genders,
        age: [+ctx.session.search.down, +ctx.session.search.up],
      },
      +ctx.session.search.page,
      'viewPatientsForGenByAge',
      'patNavForGenByGenAndAg',
    );
    if (!result) {
      await ctx.answerCbQuery(noPatintsMessage[ctx.session.lang], {
        show_alert: true,
      });
      return;
    }
    await ctx.deleteMessage();
    ctx.session.lastMessage = await ctx.reply(result.text, {
      reply_markup: {
        inline_keyboard: [
          ...result.buttons,
          ...backToAges[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }

  @Action(/viewPatientsForGenBySize/)
  async viewPatientsForGenBySize(@Ctx() ctx: ContextType) {
    const [, id] = (ctx.update as any).callback_query.data.split('=');
    const application = await this.patientsRepo.findOne({
      where: { id },
    });
    if (!application) {
      await ctx.answerCbQuery('oops', { show_alert: true });
      return;
    }
    const l = ctx.session.lang;
    const message =
      `${patientsInformation.name[l]}${application.name}\n` +
      `${patientsInformation.age[l]}${application.age}\n` +
      `${patientsInformation.height[l]}${application.height}\n` +
      `${patientsInformation.size[l]}${application.size ? application.size : patientsInformation.lookAge[l]}\n` +
      `${patientsInformation.stuff[l]}${application.stuff}\n` +
      `${patientsInformation.region[l]}${application.region.charAt(0).toUpperCase() + application.region.slice(1)}\n` +
      `${patientsInformation.district[l]}${application.district.charAt(0).toUpperCase() + application.district.slice(1)}\n`;

    switch (application.media.type) {
      case 'PHOTO':
        await ctx.deleteMessage();
        ctx.session.lastMessage = await ctx.sendPhoto(
          application.media.file_id,
          {
            caption: message,
            reply_markup: {
              inline_keyboard: [
                [
                  Markup.button.callback(
                    helpFor[ctx.session.lang],
                    `helpFor=${application.id}`,
                  ),
                ],
                ...backToPatientsListFromGenderSize[ctx.session.lang]
                  .inline_keyboard,
              ],
            },
          },
        );
        break;
      case 'VIDEO':
        await ctx.deleteMessage();
        ctx.session.lastMessage = await ctx.sendVideo(
          application.media.file_id,
          {
            caption: message,
            reply_markup: {
              inline_keyboard: [
                [
                  Markup.button.callback(
                    helpFor[ctx.session.lang],
                    `helpFor=${application.id}`,
                  ),
                ],
                ...backToPatientsListFromGenderSize[ctx.session.lang]
                  .inline_keyboard,
              ],
            },
          },
        );
        break;
    }
  }

  @Action('backToPatientsListFromGenderSize')
  async backToPatientsListFromGenderSize(@Ctx() ctx: ContextType) {
    const result = await this.buttonService.generatePatientsButtons(
      {
        gender: ctx.session.search.gender as Genders,
        age: [+ctx.session.search.down, +ctx.session.search.up],
      },
      +ctx.session.search.page,
      'viewPatientsForGenBySize',
      'patNavForGenByGenAndSz',
    );
    if (!result) {
      await ctx.answerCbQuery(noPatintsMessage[ctx.session.lang], {
        show_alert: true,
      });
      return;
    }
    await ctx.deleteMessage();
    ctx.session.lastMessage = await ctx.reply(result.text, {
      reply_markup: {
        inline_keyboard: [
          ...result.buttons,
          ...backToS[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }

  @Action(/viewPatientsForGenAll/)
  async viewPatientsForGenAll(@Ctx() ctx: ContextType) {
    const [, id] = (ctx.update as any).callback_query.data.split('=');
    const application = await this.patientsRepo.findOne({
      where: { id },
    });
    if (!application) {
      await ctx.answerCbQuery('oops', { show_alert: true });
      return;
    }
    const l = ctx.session.lang;
    const message =
      `${patientsInformation.name[l]}${application.name}\n` +
      `${patientsInformation.age[l]}${application.age}\n` +
      `${patientsInformation.height[l]}${application.height}\n` +
      `${patientsInformation.size[l]}${application.size ? application.size : patientsInformation.lookAge[l]}\n` +
      `${patientsInformation.stuff[l]}${application.stuff}\n` +
      `${patientsInformation.region[l]}${application.region.charAt(0).toUpperCase() + application.region.slice(1)}\n` +
      `${patientsInformation.district[l]}${application.district.charAt(0).toUpperCase() + application.district.slice(1)}\n`;

    switch (application.media.type) {
      case 'PHOTO':
        await ctx.deleteMessage();
        ctx.session.lastMessage = await ctx.sendPhoto(
          application.media.file_id,
          {
            caption: message,
            reply_markup: {
              inline_keyboard: [
                [
                  Markup.button.callback(
                    helpFor[ctx.session.lang],
                    `helpFor=${application.id}`,
                  ),
                ],
                ...backToPatientsListFromAll[ctx.session.lang].inline_keyboard,
              ],
            },
          },
        );
        break;
      case 'VIDEO':
        await ctx.deleteMessage();
        ctx.session.lastMessage = await ctx.sendVideo(
          application.media.file_id,
          {
            caption: message,
            reply_markup: {
              inline_keyboard: [
                [
                  Markup.button.callback(
                    helpFor[ctx.session.lang],
                    `helpFor=${application.id}`,
                  ),
                ],
                ...backToPatientsListFromAll[ctx.session.lang].inline_keyboard,
              ],
            },
          },
        );
        break;
    }
  }

  @Action('backToPatientsListFromAll')
  async backToPatientsListFromAll(@Ctx() ctx: ContextType) {
    const result = await this.buttonService.generatePatientsButtons(
      {},
      +ctx.session.search.page,
      'viewPatientsForGenAll',
      'patNavForGenAll',
    );
    if (!result) {
      await ctx.answerCbQuery(noPatintsMessage[ctx.session.lang], {
        show_alert: true,
      });
      return;
    }
    await ctx.deleteMessage();
    ctx.session.lastMessage = await ctx.reply(result.text, {
      reply_markup: {
        inline_keyboard: [
          ...result.buttons,
          ...backToViewPatients[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }

  @Action(/helpFor/)
  async helpFor(@Ctx() ctx: ContextType) {
    await ctx.scene.enter('repairScene');
  }
}
