import { InjectRepository } from '@nestjs/typeorm';
import { Ctx, On, Scene, SceneEnter } from 'nestjs-telegraf';
import { askPatientHeightMessage, ContextType } from 'src/common';
import {
  PatientsEntity,
  PatientsRepository,
  UsersEntity,
  UsersRepository,
} from 'src/core';
import {
  alertAgeInput,
  AskingWhatPatientNeeds,
  askPatientAgeMessage,
  askPatientNameMessage,
  askVideoOrPhotoOfPatientMessage,
} from 'src/common';

@Scene('sendApplyScene')
export class SendApplyScene {
  constructor(
    @InjectRepository(PatientsEntity)
    private readonly patientRepo: PatientsRepository,
    @InjectRepository(UsersEntity)
    private readonly userRepo: UsersRepository,
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
    const { region, district } = await this.userRepo.findOne({
      where: { telegram_id: `${ctx.from.id}` },
    });
    if (message.photo && message.photo.length > 0) {
      const photoId = message.photo[message.photo.length - 1].file_id;
      await this.patientRepo.update(
        { id: ctx.session.patientApp.id },
        { media: photoId, region, district },
      );
      ctx.scene.enter('enterTheNameOfPatientScene');
    } else {
      await ctx.reply('No photo found in the message.');
    }
  }
  @On('video')
  async onVideo(@Ctx() ctx: ContextType) {
    const message = ctx.message as any;
    const { region, district } = await this.userRepo.findOne({
      where: { telegram_id: `${ctx.from.id}` },
    });
    if (message.video) {
      const videoId = message.video.file_id;
      await this.patientRepo.update(
        { id: ctx.session.patientApp.id },
        { media: videoId, region, district },
      );
      ctx.scene.enter('enterTheNameOfPatientScene');
    } else {
      await ctx.reply('No video found in the message.');
    }
  }
}
@Scene('enterTheNameOfPatientScene')
export class EnterTheNameOfPatientScene {
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
      await this.patientRepo.update(
        { id: ctx.session.patientApp.id },
        { name },
      );
      await ctx.scene.enter('enterTheAgeOfPatientScene');
    }
  }
}
@Scene('enterTheAgeOfPatientScene')
export class EnterTheAgeOfPatientScene {
  constructor(
    @InjectRepository(PatientsEntity)
    private readonly patientRepo: PatientsRepository,
  ) {}
  @SceneEnter()
  async onEnter(@Ctx() ctx: ContextType) {
    await ctx.reply(askPatientAgeMessage[ctx.session.lang]);
  }
  @On('text')
  async textHandler(ctx: ContextType) {
    if ('text' in ctx.message) {
      const age = parseInt(ctx.message.text, 10);
      if (isNaN(age) || age < 0) {
        await ctx.reply(alertAgeInput[ctx.session.lang]);
        return;
      }
      await this.patientRepo.update(
        { id: ctx.session.patientApp.id },
        { age: age },
      );
      await ctx.scene.enter('enterTheHeightOfPatientScene');
    }
  }
}
@Scene('enterTheHeightOfPatientScene')
export class EnterTheHeightOfPatientScene {
  constructor(
    @InjectRepository(PatientsEntity)
    private readonly patientRepo: PatientsRepository,
  ) {}
  @SceneEnter()
  async onEnter(@Ctx() ctx: ContextType) {
    await ctx.reply(askPatientHeightMessage[ctx.session.lang]);
  }
  @On('text')
  async textHandler(ctx: ContextType) {
    if ('text' in ctx.message) {
      const height = ctx.message.text;
      await this.patientRepo.update(
        { id: ctx.session.patientApp.id },
        { height: height },
      );
      ctx.scene.enter(`enterThePatientNeeds`);
    }
  }
}
@Scene(`enterThePatientNeeds`)
export class AskPatientNeeds {
  constructor(
    @InjectRepository(PatientsEntity)
    private readonly patientRepo: PatientsRepository,
  ) {}
  @SceneEnter()
  async onEnter(@Ctx() ctx: ContextType) {
    await ctx.reply(AskingWhatPatientNeeds[ctx.session.lang]);
  }
  @On('text')
  async textHandler(ctx: ContextType) {
    if ('text' in ctx.message) {
      const needs = ctx.message.text;
      await this.patientRepo.update(
        { id: ctx.session.patientApp.id },
        { stuff: needs },
      );
    }
  }
}
