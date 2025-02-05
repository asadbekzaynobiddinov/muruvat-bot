import { Update, Action, Ctx } from 'nestjs-telegraf';
import {
  mainMessage,
  repairKeys,
  repairMessage,
  viewPatientsKeys,
} from 'src/common/constants';
import { ContextType } from 'src/common';

@Update()
export class ActionsService {
  @Action('repair')
  async repair(@Ctx() ctx: ContextType) {
    await ctx.editMessageText(repairMessage[ctx.session.lang], {
      reply_markup: repairKeys[ctx.session.lang],
    });
  }

  @Action('view_patients')
  async viewPatients(@Ctx() ctx: ContextType) {
    await ctx.editMessageText(mainMessage[ctx.session.lang], {
      reply_markup: viewPatientsKeys[ctx.session.lang],
    });
  }

  @Action('toAdminAsGenerous')
  async toAdmin(@Ctx() ctx: ContextType) {
    await ctx.reply('To Admin As Generous');
  }

  @Action('settings')
  async settings(@Ctx() ctx: ContextType) {
    await ctx.reply('Settings');
  }
}
