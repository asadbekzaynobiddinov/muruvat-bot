import { InjectRepository } from '@nestjs/typeorm';
import { Action, Ctx, On, Scene, SceneEnter } from 'nestjs-telegraf';
import { Markup } from 'telegraf';
import {
  askPatientGender,
  askPatientHeightMessage,
  askPatientNeedsSize,
  ContextType,
  genderForPatient,
  Genders,
  sizeByAgeKeys,
  alertAgeInput,
  AskingWhatPatientNeeds,
  askPatientAgeMessage,
  askPatientNameMessage,
  askVideoOrPhotoOfPatientMessage,
  sizePatientStuffKeys,
} from 'src/common';
import {
  PatientsEntity,
  PatientsRepository,
  UsersEntity,
  UsersRepository,
} from 'src/core';

@Scene('sendApplyScene')
export class SendApplyScene {
  constructor(
    @InjectRepository(PatientsEntity)
    private readonly patientRepo: PatientsRepository,
  ) {}
  @SceneEnter()
  async onEnter(@Ctx() ctx: ContextType) {
    await ctx.reply(askPatientGender[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: [
          ...genderForPatient[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }
  @Action('female_patient')
  async felmaleGenHandler(ctx: ContextType) {
    await this.patientRepo.update(
      { id: ctx.session.patientApp.id },
      { gender: Genders.FEMALE },
    );
    await ctx.scene.enter('sendMediaApplyScene');
  }
  @Action('male_patient')
  async maleGenHandler(ctx: ContextType) {
    await this.patientRepo.update(
      { id: ctx.session.patientApp.id },
      { gender: Genders.MALE },
    );
    await ctx.scene.enter('sendMediaApplyScene');
  }
}
@Scene('sendMediaApplyScene')
export class SendMediaApplyScene {
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
      ctx.scene.enter('enterThePatientNeeds');
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
      await ctx.scene.enter('AskPatientNeedsStuffSize');
    }
  }
}
@Scene('AskPatientNeedsStuffSize')
export class AskPatientNeedsStuffSize {
  constructor(
    @InjectRepository(PatientsEntity)
    private readonly patientRepo: PatientsRepository,
  ) {}
  @SceneEnter()
  async onEnter(@Ctx() ctx: ContextType) {
    await ctx.reply(askPatientNeedsSize[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: [
          ...sizePatientStuffKeys.inline_keyboard,
          ...sizeByAgeKeys[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }
  @Action('by_age')
  async byAgeCallbackHandler(@Ctx() ctx: ContextType) {
    await ctx.reply('Tasdiqlaysizmi ?', {
      reply_markup: {
        inline_keyboard: [
          [
            Markup.button.callback('✅', 'acceptApply'),
            Markup.button.callback('❌', 'rejectApply'),
          ],
        ],
      },
    });
    await ctx.scene.leave();
  }
}
