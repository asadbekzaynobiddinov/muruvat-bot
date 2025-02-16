import { Ctx, InjectBot, On, Scene, SceneEnter } from 'nestjs-telegraf';
import {
  adminReplyMesage,
  ContextType,
  generousMenuKeys,
  mainMessage,
  messageToAdmin,
} from 'src/common';
import { config } from 'src/config';
import { Telegraf } from 'telegraf';

@Scene('sendReportToAdminAsGenerous')
export class ReportToAdminAsGenerous {
  constructor(@InjectBot() private readonly bot: Telegraf) {}
  @SceneEnter()
  async onEnter(@Ctx() ctx: ContextType) {
    ctx.editMessageText(messageToAdmin[ctx.session.lang]);
  }
  @On('text')
  async textHandler(@Ctx() ctx) {
    if ('text' in ctx.message) {
      await ctx.reply(adminReplyMesage[ctx.session.lang], {
        reply_to_message_id: ctx.update.message.message_id,
      });
      await this.bot.telegram.sendMessage(config.TG_CHANNEL, ctx.message.text, {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Xabarga javob',
                url: `https://t.me/${ctx.from.username}` || '',
              },
            ],
          ],
        },
      });
      ctx.session.lastMessage = await ctx.reply(mainMessage[ctx.session.lang], {
        reply_markup: generousMenuKeys[ctx.session.lang],
      });
      ctx.scene.leave();
    }
  }
}
