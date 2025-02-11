import { ContextType } from 'src/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ctx, On, Scene, SceneEnter } from 'nestjs-telegraf';
import { PatientsEntity, PatientsRepository } from 'src/core';
import { askVideoOrPhotoOfPatientMessage } from 'src/common/constants/sabrli/message';
import { Context } from 'telegraf';

@Scene('sendApplyScene')
export class SendApplyScene {
  constructor(
    @InjectRepository(PatientsEntity)
    private readonly patientRepo: PatientsRepository,
  ) {}
  @SceneEnter()
  async onEnter(@Ctx() ctx: ContextType) {
    await this.patientRepo.create({ user_id: `${ctx.from.id}` });
    await ctx.editMessageText(
      askVideoOrPhotoOfPatientMessage[ctx.session.lang],
    );
  }
  @On('photo')
  async onPhoto(@Ctx() ctx: Context) {
    const message = ctx.message as any;
    if (message.photo && message.photo.length > 0) {
      const photoId = message.photo[message.photo.length - 1].file_id;
      const fileLink = await ctx.telegram.getFileLink(photoId);
      await ctx.reply(`Photo file id: ${photoId}`);
      await this.patientRepo.update(
        { user_id: `${ctx.from.id}` },
        { media: photoId },
      );
      await ctx.reply(`Photo file link: ${fileLink}`);
    } else {
      await ctx.reply('No photo found in the message.');
    }
  }
  @On('video')
  async onVideo(@Ctx() ctx: Context) {
    const message = ctx.message as any;
    if (message.video) {
      const videoId = message.video.file_id;
      const fileLink = await ctx.telegram.getFileLink(videoId);
      await this.patientRepo.update(
        { user_id: `${ctx.from.id}` },
        { media: videoId },
      );
      await ctx.reply(`Video file id: ${videoId}`);
      await ctx.reply(`Video file link: ${fileLink}`);
    } else {
      await ctx.reply('No video found in the message.');
    }
  }
}
