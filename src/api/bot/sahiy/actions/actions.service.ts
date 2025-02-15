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
} from 'src/common';
import { ButtonsService } from '../../button/button.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity, UsersRepository } from 'src/core';
import { Languages } from 'src/common/enum/language';
import { UseGuards } from '@nestjs/common';
import { LastMessageGuard } from 'src/common/guard/lastMessage.guard';

@Update()
@UseGuards(LastMessageGuard)
export class ActionsService {
  constructor(
    private readonly buttonService: ButtonsService,
    @InjectRepository(UsersEntity) private readonly userRepo: UsersRepository,
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
      'viewPatientsForGen',
      'patNavForGenByReg',
    );
    if (!result) {
      await ctx.answerCbQuery(noPatintsMessage[ctx.session.lang], {
        show_alert: true,
      });
      return;
    }
    console.log(result);
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
      'viewPatientsForGen',
      'patNavForGenByReg',
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
      'viewPatientsForGen',
      'patNavForGenByGenAndAg',
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
      'viewPatientsForGen',
      'patNavForGenByGenAndAg',
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
          ...backToAges[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }

  @Action(/size/)
  async size(@Ctx() ctx: ContextType) {
    const [, size] = (ctx.update as any).callback_query.data.split('_');
    ctx.session.search.size = size;
    console.log(ctx.session.search);
    const result = await this.buttonService.generatePatientsButtons(
      {
        gender: ctx.session.search.gender as Genders,
        size: ctx.session.search.size,
      },
      1,
      'viewPatientsForGen',
      'patNavForGenByGenAndSz',
    );
    if (!result) {
      await ctx.answerCbQuery(noPatintsMessage[ctx.session.lang], {
        show_alert: true,
      });
      return;
    }
    await ctx.editMessageText('Endi yoziladi', {
      reply_markup: backToS[ctx.session.lang],
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
      'viewPatientsForGen',
      'patNavForGenByGenAndSz',
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
      'viewPatientsForGen',
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

  @Action(/patNavForGenAll/)
  async patNavForGenAll(@Ctx() ctx: ContextType) {
    const [, page] = (ctx.update as any).callback_query.data.split('=');
    const result = await this.buttonService.generatePatientsButtons(
      {},
      +page,
      'viewPatientsForGen',
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

  @Action(/viewPatientsForGen/)
  async viewPatientsForGen(@Ctx() ctx: ContextType) {
    const [, id] = (ctx.update as any).callback_query.data.split('=');
    console.log(id);
  }
}
