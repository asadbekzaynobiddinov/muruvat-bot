import { Update, Ctx, Command } from 'nestjs-telegraf';

@Update()
export class CommandsService {
  @Command('start')
  async start(@Ctx() ctx) {
    ctx.reply('Assalomu alaykum');
  }
}
