import { Update, Action, Ctx } from 'nestjs-telegraf';
import {
  ageKeys,
  backToAges,
  backToChanges,
  backToDistricts,
  backToGendersForAge,
  backToGendersForSize,
  backToGenerosMenu,
  backToRegions,
  backToS,
  backToViewPatients,
  ContextType,
  genderForAgeKeys,
  genderForSizeKeys,
  Genders,
  generousMenuKeys,
  langKeys,
  langMessages,
  mainMessage,
  neededDistrictMessage,
  neededRegionMessage,
  noPatintsMessage,
  repairKeys,
  repairMessage,
  settingsKeys,
  sizeKeys,
  viewPatientsKeys,
} from 'src/common';
import { Markup } from 'telegraf';
import { ButtonsService } from '../../button/button.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity, UsersRepository } from 'src/core';
import { Languages } from 'src/common/enum/language';

@Update()
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
    await ctx.editMessageText('To Admin As Generous', {
      reply_markup: {
        inline_keyboard: [
          [Markup.button.callback('🔙', 'back_to_generous_menu')],
        ],
      },
    });
  }

  @Action('settings_for_generous')
  async settings(@Ctx() ctx: ContextType) {
    await ctx.editMessageText(mainMessage[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: [
          ...settingsKeys[ctx.session.lang].inline_keyboard,
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

  @Action(/pageRegion/)
  async pageRegion(@Ctx() ctx: ContextType) {
    const [, page] = (ctx.update as any).callback_query.data.split('_');
    const buttons = this.buttonService.generateRegionButtons(
      +page,
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

  @Action(/region/)
  async region(@Ctx() ctx: ContextType) {
    const [, region] = (ctx.update as any).callback_query.data.split('_');
    ctx.session.search.region = region;
    console.log(ctx.session);
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
          ...backToRegions[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }

  @Action(/pageDistrict/)
  async pageDistrict(@Ctx() ctx: ContextType) {
    const [, page] = (ctx.update as any).callback_query.data.split('_');
    const buttons = this.buttonService.generateDistrictButtons(
      ctx.session.search.region,
      +page,
      ctx.session.lang,
      'patientsDistrictForG',
    );
    await ctx.editMessageText(neededDistrictMessage[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: [
          ...buttons.inline_keyboard,
          ...backToRegions[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }

  @Action(/district/)
  async district(@Ctx() ctx: ContextType) {
    const [, district] = (ctx.update as any).callback_query.data.split('_');
    ctx.session.search.district = district;
    const result = await this.buttonService.generatePatientsButtons(
      {
        region: ctx.session.search.region,
        district: ctx.session.search.district,
      },
      1,
    );
    if (!result) {
      await ctx.answerCbQuery(noPatintsMessage[ctx.session.lang], {
        show_alert: true,
      });
      return;
    }
    await ctx.editMessageText('Endi yoziladi', {
      reply_markup: backToDistricts[ctx.session.lang],
    });
  }

  @Action('back_to_r')
  async backToRegions(@Ctx() ctx: ContextType) {
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

  @Action('back_to_d')
  async backToDistricts(@Ctx() ctx: ContextType) {
    const buttons = this.buttonService.generateDistrictButtons(
      ctx.session.search.region,
      0,
      ctx.session.lang,
      'patientsDistrictForG',
    );
    await ctx.editMessageText(neededDistrictMessage[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: [
          ...buttons.inline_keyboard,
          ...backToRegions[ctx.session.lang].inline_keyboard,
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

  @Action('change_lang')
  async changeLang(@Ctx() ctx: ContextType) {
    await ctx.editMessageText(langMessages[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: [
          ...langKeys.inline_keyboard,
          ...backToChanges[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }

  @Action('setUz')
  async setUz(@Ctx() ctx: ContextType) {
    await this.userRepo.update(
      { telegram_id: `${ctx.from.id}` },
      { lang: Languages.UZ },
    );
    ctx.session.lang = Languages.UZ;
    await ctx.editMessageText(mainMessage[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: [
          ...settingsKeys[ctx.session.lang].inline_keyboard,
          ...backToGenerosMenu[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }

  @Action('setRu')
  async setRu(@Ctx() ctx: ContextType) {
    await this.userRepo.update(
      { telegram_id: `${ctx.from.id}` },
      { lang: Languages.RU },
    );
    ctx.session.lang = Languages.RU;
    await ctx.editMessageText(mainMessage[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: [
          ...settingsKeys[ctx.session.lang].inline_keyboard,
          ...backToGenerosMenu[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }

  @Action('setEn')
  async setEn(@Ctx() ctx: ContextType) {
    await this.userRepo.update(
      { telegram_id: `${ctx.from.id}` },
      { lang: Languages.EN },
    );
    ctx.session.lang = Languages.EN;
    await ctx.editMessageText(mainMessage[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: [
          ...settingsKeys[ctx.session.lang].inline_keyboard,
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
          ...settingsKeys[ctx.session.lang].inline_keyboard,
          ...backToGenerosMenu[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }

  @Action('change_phone')
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
    );
    if (!result) {
      await ctx.answerCbQuery(noPatintsMessage[ctx.session.lang], {
        show_alert: true,
      });
      return;
    }
    await ctx.editMessageText('Endi yoziladi', {
      reply_markup: backToAges[ctx.session.lang],
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

  @Action('back_to_g_f_a')
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

  @Action('back_to_g_f_s')
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

  @Action('back_to_a')
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

  @Action('back_to_s')
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
    await ctx.editMessageText('Endi yoziladi', {
      reply_markup: backToViewPatients[ctx.session.lang],
    });
  }
}
