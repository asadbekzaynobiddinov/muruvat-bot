import { Action, Ctx, Update } from 'nestjs-telegraf';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity, UsersRepository } from 'src/core';
import { ButtonsService } from '../../button/button.service';
import {
  ContextType,
  patientMenuKeys,
  langForPatientKeys,
  mainMessage,
  backToPatientMenu,
  settingsKeysForPatient,
} from 'src/common';
import { patientLangMessages } from 'src/common/constants/sabrli/message';
import { Languages } from 'src/common/enum/language';

@Update()
export class ActionsService {
  constructor(
    private readonly buttonService: ButtonsService,
    @InjectRepository(UsersEntity) private readonly userRepo: UsersRepository,
  ) {}
  @Action('apply')
  async sendApply(@Ctx() ctx: ContextType) {
    await ctx.scene.enter('sendApplyScene');
  }
  @Action('toAdminAsPatient')
  async toAdminAsPatient(@Ctx() ctx: ContextType) {
    // await ctx.editMessageText();
  }
  @Action('settings_for_patient')
  async settingsForPatient(@Ctx() ctx: ContextType) {
    await ctx.editMessageText(mainMessage[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: [
          ...settingsKeysForPatient[ctx.session.lang].inline_keyboard,
          ...backToPatientMenu[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }
  @Action('back_to_patient_menu')
  async backToPatientMenu(@Ctx() ctx: ContextType) {
    await ctx.editMessageText(mainMessage[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: [...patientMenuKeys[ctx.session.lang].inline_keyboard],
      },
    });
  }
  @Action('change_phone_of_patient')
  async changePhoneOfPatient(@Ctx() ctx: ContextType) {
    await ctx.scene.enter('ChangePatientPhoneScene');
  }
  @Action('change_lang_of_patient')
  async changeLangOfPatient(@Ctx() ctx: ContextType) {
    await ctx.editMessageText(patientLangMessages[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: [
          ...langForPatientKeys.inline_keyboard,
          ...backToPatientMenu[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }
  @Action('setUzPatient')
  async setLangPatientToUz(@Ctx() ctx: ContextType) {
    await this.userRepo.update(
      { telegram_id: `${ctx.from.id}` },
      { lang: Languages.UZ },
    );
    ctx.session.lang = Languages.UZ;
    await ctx.editMessageText(mainMessage[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: [
          ...settingsKeysForPatient[ctx.session.lang].inline_keyboard,
          ...backToPatientMenu[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }
  @Action('setRuPatient')
  async setLangPatientToRu(@Ctx() ctx: ContextType) {
    await this.userRepo.update(
      { telegram_id: `${ctx.from.id}` },
      { lang: Languages.RU },
    );
    ctx.session.lang = Languages.RU;
    await ctx.editMessageText(mainMessage[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: [
          ...settingsKeysForPatient[ctx.session.lang].inline_keyboard,
          ...backToPatientMenu[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }
  @Action('setEnPatient')
  async setLangPatientToEn(@Ctx() ctx: ContextType) {
    await this.userRepo.update(
      { telegram_id: `${ctx.from.id}` },
      { lang: Languages.EN },
    );
    ctx.session.lang = Languages.EN;
    await ctx.editMessageText(mainMessage[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: [
          ...settingsKeysForPatient[ctx.session.lang].inline_keyboard,
          ...backToPatientMenu[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }
}
