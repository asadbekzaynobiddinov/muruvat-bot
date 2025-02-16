import { InjectRepository } from '@nestjs/typeorm';
import { Scene, SceneEnter, On, Action, Ctx } from 'nestjs-telegraf';
import {
  acceptMessage,
  ContextType,
  generousMenuKeys,
  mainMessage,
  stuffs,
  thankMessage,
} from 'src/common';
import { config } from 'src/config';
import {
  GenerousEntity,
  GenerousRepository,
  PatientsEntity,
  PatientsRepository,
  UsersEntity,
  UsersRepository,
} from 'src/core';
import { Markup } from 'telegraf';

@Scene('repairScene')
export class RepairScene {
  constructor(
    @InjectRepository(GenerousEntity)
    private readonly generousRepo: GenerousRepository,
    @InjectRepository(UsersEntity) private readonly userRepo: UsersRepository,
    @InjectRepository(PatientsEntity)
    private readonly patientRepo: PatientsRepository,
  ) {}
  @SceneEnter()
  async onEnter(@Ctx() ctx: ContextType) {
    const [, id] = (ctx.update as any).callback_query.data.split('=');
    ctx.session.applicationId = id;
    await ctx.deleteMessage();
    await ctx.reply(stuffs[ctx.session.lang]);
  }

  @On('text')
  async onText(@Ctx() ctx: ContextType) {
    const stuff = await (ctx.update as any).message.text;
    const currentUser = await this.userRepo.findOne({
      where: { telegram_id: `${ctx.from.id}` },
    });
    const newApplication = this.generousRepo.create({
      stuff,
      whom: ctx.session.applicationId
        ? ctx.session.applicationId.toString()
        : 'istalgan odamga',
      user: {
        id: currentUser.id,
      },
    });
    try {
      await this.generousRepo.save(newApplication);
    } catch (error) {
      console.log(error.message);
    }

    ctx.session.lastMessage = await ctx.reply(acceptMessage[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: [
          [
            Markup.button.callback('✅', `accept=${newApplication.id}`),
            Markup.button.callback('❌', `reject=${newApplication.id}`),
          ],
        ],
      },
    });
  }

  @Action(/reject/)
  async reject(@Ctx() ctx: ContextType) {
    const [, id] = (ctx.update as any).callback_query.data.split('=');
    await this.generousRepo.delete({ id });
    await ctx.editMessageText(mainMessage[ctx.session.lang], {
      reply_markup: generousMenuKeys[ctx.session.lang],
    });
    await ctx.scene.leave();
  }

  @Action(/accept/)
  async accept(@Ctx() ctx: ContextType) {
    const [, id] = (ctx.update as any).callback_query.data.split('=');
    const application = await this.generousRepo.findOne({
      where: { id },
      relations: ['user'],
    });

    let patient = null;
    if (!isNaN(Number(application.whom))) {
      patient = await this.patientRepo.findOne({
        where: { id: application.whom },
        relations: ['user'],
      });
    }

    await ctx.editMessageText(thankMessage[ctx.session.lang]);
    ctx.session.lastMessage = await ctx.reply(mainMessage[ctx.session.lang], {
      reply_markup: generousMenuKeys[ctx.session.lang],
    });

    const chanelMesage =
      `Kimdan:\n     ${application.user.name}\n` +
      `     ${application.user.region}\n` +
      `     ${application.user.district}\n` +
      `     <code>${application.user.phone_number}</code>\n` +
      `     ${application.stuff}\n` +
      `\nKimga: \n      ${
        patient
          ? `${patient.name}\n      ${patient.region}\n      ${patient.district}\n      <code>${patient.user.phone_number ? patient.user.phone_number : 'raqami nomalum'}</code>`
          : 'istalgan odamga'
      }\n`;

    await ctx.telegram.sendMessage(
      config.GENEREOUS_APPLICATIONS_CHANEL,
      chanelMesage,
      {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              Markup.button.url(
                `Bog'lanish`,
                `https://t.me/${ctx.from.username}` || '',
              ),
            ],
          ],
        },
      },
    );
    await ctx.scene.leave();
  }
}
