import { Action, Ctx, InjectBot, Update } from 'nestjs-telegraf';
import { InjectRepository } from '@nestjs/typeorm';
import {
  PatientsEntity,
  PatientsRepository,
  UsersEntity,
  UsersRepository,
} from 'src/core';
import {
  ContextType,
  patientMenuKeys,
  langForPatientKeys,
  mainMessage,
  backToPatientMenu,
  settingsKeysForPatient,
  patientLangMessages,
  createTemplate,
  usernameFirst,
  acceptMessage,
} from 'src/common';
import { Languages } from 'src/common/enum/language';
import { Markup, Telegraf } from 'telegraf';
import { UseGuards } from '@nestjs/common';
import { LastMessageGuard } from 'src/common/guard/lastMessage.guard';
import { Media } from 'src/common/enum/media.';
import { config } from 'src/config';
import { ChannelSubscriptionGuard } from 'src/common/guard/subsccribe.guard';
import { PatientGuard } from 'src/common/guard/patient.guard';
@Update()
@UseGuards(PatientGuard, LastMessageGuard)
export class ActionsService {
  constructor(
    @InjectBot() private readonly bot: Telegraf,
    @InjectRepository(UsersEntity) private readonly userRepo: UsersRepository,
    @InjectRepository(PatientsEntity)
    private readonly patientRepo: PatientsRepository,
  ) {}
  @Action('apply')
  @UseGuards(ChannelSubscriptionGuard)
  async sendApply(@Ctx() ctx: ContextType) {
    const user = await this.userRepo.findOne({
      where: { telegram_id: `${ctx.from.id}` },
    });
    const createPatientApply = this.patientRepo.create({
      user: {
        id: user.id,
      },
    });
    await this.patientRepo.save(createPatientApply);
    ctx.session.patientApp.id = createPatientApply.id;
    await ctx.scene.enter('sendApplyScene');
  }
  @Action('toAdminAsPatient')
  @UseGuards(ChannelSubscriptionGuard)
  async toAdminAsPatient(@Ctx() ctx: ContextType) {
    if (!ctx.from.username) {
      await ctx.answerCbQuery(usernameFirst[ctx.session.lang], {
        show_alert: true,
      });
      return;
    }
    ctx.scene.enter('sendReportToAdminAsPatient');
  }
  @Action('settings_for_patient')
  @UseGuards(ChannelSubscriptionGuard)
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
    await ctx.scene.enter('changePatientsPhone');
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
  @Action(/StuffSize/)
  async callbackHandler(@Ctx() ctx: ContextType) {
    const [, size] = (ctx.update as any).callback_query.data.split('=');
    await this.patientRepo.update({ id: ctx.session.patientApp.id }, { size });
    await ctx.scene.leave();
    await ctx.editMessageText(acceptMessage[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: [
          [
            Markup.button.callback('✅', 'acceptApply'),
            Markup.button.callback('❌', 'rejectApply'),
          ],
        ],
      },
    });
  }
  @Action('acceptApply')
  async acceptApply(@Ctx() ctx: ContextType) {
    await ctx.editMessageText(mainMessage[ctx.session.lang], {
      reply_markup: patientMenuKeys[ctx.session.lang],
    });
    const data = await this.patientRepo.findOne({
      where: {
        id: `${ctx.session.patientApp.id}`,
      },
    });
    if (!data || !data.media.file_id) {
      return;
    }
    try {
      if (data.media.type == Media.video) {
        await this.bot.telegram.sendVideo(
          config.PATIENT_APPLICATIONS_CHANEL,
          data.media.file_id,
          {
            caption: createTemplate(data),
            parse_mode: 'Markdown',
            reply_markup: {
              inline_keyboard: [
                [
                  Markup.button.callback('✅', `acceptPostAsAdmin=${data.id}`),
                  Markup.button.callback('❌', `rejectPostAsAdmin=${data.id}`),
                ],
              ],
            },
          },
        );
      } else {
        await this.bot.telegram.sendPhoto(
          config.PATIENT_APPLICATIONS_CHANEL,
          data.media.file_id,
          {
            caption: createTemplate(data),
            parse_mode: 'Markdown',
            reply_markup: {
              inline_keyboard: [
                [
                  Markup.button.callback('✅', `acceptPostAsAdmin=${data.id}`),
                  Markup.button.callback('❌', `rejectPostAsAdmin=${data.id}`),
                ],
              ],
            },
          },
        );
      }
    } catch (error) {
      console.error(error.message);
    }
    await ctx.scene.leave();
  }

  @Action('rejectApply')
  async reject(@Ctx() ctx: ContextType) {
    await this.patientRepo.delete({ id: `${ctx.session.patientApp.id}` });
    await ctx.editMessageText(mainMessage[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: [...patientMenuKeys[ctx.session.lang].inline_keyboard],
      },
    });
    await ctx.scene.leave();
  }
}
