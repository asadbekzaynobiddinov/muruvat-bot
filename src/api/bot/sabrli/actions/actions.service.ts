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
} from 'src/common';
import { Languages } from 'src/common/enum/language';
import { Markup, Telegraf } from 'telegraf';
import { UseGuards } from '@nestjs/common';
import { LastMessageGuard } from 'src/common/guard/lastMessage.guard';
import { Media } from 'src/common/enum/media.';
@UseGuards(LastMessageGuard)
@Update()
export class ActionsService {
  constructor(
    @InjectBot() private readonly bot: Telegraf,
    @InjectRepository(UsersEntity) private readonly userRepo: UsersRepository,
    @InjectRepository(PatientsEntity)
    private readonly patientRepo: PatientsRepository,
  ) {}
  @Action('apply')
  async sendApply(@Ctx() ctx: ContextType) {
    const createPatientApply = this.patientRepo.create({
      user_id: `${ctx.from.id}`,
    });
    await this.patientRepo.save(createPatientApply);
    ctx.session.patientApp.id = createPatientApply.id;
    await ctx.scene.enter('sendApplyScene');
  }
  @Action('toAdminAsPatient')
  async toAdminAsPatient(@Ctx() ctx: ContextType) {
    ctx.scene.enter('sendReportToAdminAsPatient');
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
  @Action(/StuffSize/)
  async callbackHandler(@Ctx() ctx: ContextType) {
    const [, size] = (ctx.update as any).callback_query.data.split('=');
    await this.patientRepo.update({ id: ctx.session.patientApp.id }, { size });
    await ctx.scene.leave();
    await ctx.editMessageText('Tasdiqlaysizmi ?', {
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
      await ctx.reply('Fayl topilmadi.');
      return;
    }
    try {
      if (data.media.type == Media.video) {
        await this.bot.telegram.sendVideo(
          '@muruvatkorsatish',
          data.media.file_id,
          {
            caption: createTemplate(data),
            parse_mode: 'Markdown',
            reply_markup: {
              inline_keyboard: [
                [
                  Markup.button.callback('✅', 'acceptPost'),
                  Markup.button.callback('❌', 'rejectPost'),
                ],
              ],
            },
          },
        );
      } else {
        await this.bot.telegram.sendPhoto(
          '@muruvatkorsatish',
          data.media.file_id,
          {
            caption: createTemplate(data),
            parse_mode: 'Markdown',
            reply_markup: {
              inline_keyboard: [
                [
                  Markup.button.callback('✅', 'acceptPost'),
                  Markup.button.callback('❌', 'rejectPost'),
                ],
              ],
            },
          },
        );
      }
    } catch (error) {
      await ctx.reply('Media yuborishda xatolik yuz berdi.');
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
  }
}
