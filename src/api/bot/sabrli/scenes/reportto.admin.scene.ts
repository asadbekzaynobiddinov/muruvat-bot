import { Ctx, InjectBot, On, Scene, SceneEnter } from 'nestjs-telegraf';
import {
  ContextType,
  mainMessage,
  messageForToAdminAsPatient,
  patientMenuKeys,
} from 'src/common';
import { Telegraf } from 'telegraf';

@Scene('sendReportToAdminAsPatient')
export class ReportToAdminAsPatient {
  constructor(@InjectBot() private readonly bot: Telegraf) {}
  @SceneEnter()
  async onEnter(@Ctx() ctx: ContextType) {
    ctx.editMessageText(messageForToAdminAsPatient[ctx.session.lang]);
  }
  @On('text')
  async textHandler(@Ctx() ctx: ContextType) {
    if ('text' in ctx.message) {
      await this.bot.telegram.sendMessage(
        '@muruvatkorsatish',
        ctx.message.text,
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: 'Xabarga javob ✉️',
                  url: `https://t.me/music_with_spotifybot?start=admin_response`,
                },
              ],
            ],
          },
        },
      );
      ctx.reply(mainMessage[ctx.session.lang], {
        reply_markup: {
          inline_keyboard: [
            ...patientMenuKeys[ctx.session.lang].inline_keyboard,
          ],
        },
      });
      ctx.scene.leave();
    }
  }
}
