import { Update, Action, Ctx } from 'nestjs-telegraf';
import {
  backToViewPatients,
  ContextType,
  generousMenuKeys,
  mainMessage,
  regionKeys,
  regionMessage,
  repairKeys,
  repairMessage,
  settingsKeys,
  viewPatientsKeys,
} from 'src/common';
import { Markup } from 'telegraf';

@Update()
export class ActionsService {
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
      reply_markup: settingsKeys[ctx.session.lang],
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
    await ctx.editMessageText(regionMessage[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: [
          ...regionKeys[ctx.session.lang].inline_keyboard,
          ...backToViewPatients[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }

  @Action(/region/)
  async region(@Ctx() ctx) {
    const [, region] = ctx.update.callback_query.data.split('_');
    await ctx.reply(region);
  }
}
