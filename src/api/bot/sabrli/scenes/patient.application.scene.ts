import { ContextType } from 'src/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ctx, On, Scene, SceneEnter } from 'nestjs-telegraf';
import { PatientsEntity, PatientsRepository } from 'src/core';
import {
  askPatientNameMessage,
  askVideoOrPhotoOfPatientMessage,
} from 'src/common/constants/sabrli/message';
// import { Context } from 'telegraf';

@Scene('sendApplyScene')
export class SendApplyScene {
  constructor(
    @InjectRepository(PatientsEntity)
    private readonly patientRepo: PatientsRepository,
  ) {}
  @SceneEnter()
  async onEnter(@Ctx() ctx: ContextType) {
    await ctx.editMessageText(
      askVideoOrPhotoOfPatientMessage[ctx.session.lang],
    );
  }
  @On('photo')
  async onPhoto(@Ctx() ctx: ContextType) {
    const message = ctx.message as any;
    if (message.photo && message.photo.length > 0) {
      const photoId = message.photo[message.photo.length - 1].file_id;
      console.log(photoId);
      await this.patientRepo.update(
        { user_id: `${ctx.from.id}` },
        { media: photoId },
      );
      ctx.scene.enter('enterTheNameOfPatientScene');
    } else {
      await ctx.reply('No photo found in the message.');
    }
  }
  @On('video')
  async onVideo(@Ctx() ctx: ContextType) {
    const message = ctx.message as any;
    if (message.video) {
      const videoId = message.video.file_id;
      console.log(videoId);
      await this.patientRepo.update(
        { user_id: `${ctx.from.id}` },
        { media: videoId },
      );
      ctx.scene.enter('enterTheNameOfPatientScene');
    } else {
      await ctx.reply('No video found in the message.');
    }
  }
}
@Scene('enterTheNameOfPatientScene')
export class enterTheNameOfPatientScene {
  constructor(
    @InjectRepository(PatientsEntity)
    private readonly patientRepo: PatientsRepository,
  ) {}
  @SceneEnter()
  async onEnter(@Ctx() ctx: ContextType) {
    await ctx.reply(askPatientNameMessage[ctx.session.lang]);
  }
  @On('text')
  async textHandler(ctx: ContextType) {
    if ('text' in ctx.message) {
      const name = ctx.message.text;
      await this.patientRepo.update({ user_id: `${ctx.from.id}` }, { name });
      //   await ctx.scene.enter('');
    }
  }
}
