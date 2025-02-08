import { Update, Action, Ctx } from 'nestjs-telegraf';
import {
  backToDistricts,
  backToRegions,
  backToViewPatients,
  ContextType,
  generousMenuKeys,
  mainMessage,
  neededDistrictMessage,
  neededRegionMessage,
  repairKeys,
  repairMessage,
  settingsKeys,
  viewPatientsKeys,
} from 'src/common';
import { Markup } from 'telegraf';
import { ButtonsService } from '../../button/button.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity, UsersRepository } from 'src/core';

@Update()
export class ActionsService {
  constructor(
    private readonly buttonService: ButtonsService,
    @InjectRepository(UsersEntity) private readonly userRepo: UsersRepository,
  ) {}

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
    const buttons = this.buttonService.generateRegionButtons(
      0,
      ctx.session.lang,
    );
    await ctx.editMessageText(neededRegionMessage[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: [
          ...buttons.inline_keyboard,
          ...backToViewPatients[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }

  @Action(/pageRegion/)
  async pageRegion(@Ctx() ctx: ContextType) {
    const [, page] = (ctx.update as any).callback_query.data.split('_');
    const buttons = this.buttonService.generateRegionButtons(
      +page,
      ctx.session.lang,
    );
    await ctx.editMessageText(neededRegionMessage[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: [
          ...buttons.inline_keyboard,
          ...backToViewPatients[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }

  @Action(/region/)
  async region(@Ctx() ctx: ContextType) {
    const [, region] = (ctx.update as any).callback_query.data.split('_');
    ctx.session.search_region = region;
    console.log(ctx.session);
    const buttons = this.buttonService.generateDistrictButtons(
      region,
      0,
      ctx.session.lang,
    );
    await ctx.editMessageText(neededDistrictMessage[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: [
          ...buttons.inline_keyboard,
          ...backToRegions[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }

  @Action(/pageDistrict/)
  async pageDistrict(@Ctx() ctx: ContextType) {
    const [, page] = (ctx.update as any).callback_query.data.split('_');
    const buttons = this.buttonService.generateDistrictButtons(
      ctx.session.search_region,
      +page,
      ctx.session.lang,
    );
    await ctx.editMessageText(neededDistrictMessage[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: [
          ...buttons.inline_keyboard,
          ...backToRegions[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }

  @Action(/district/)
  async district(@Ctx() ctx: ContextType) {
    const [, district] = (ctx.update as any).callback_query.data.split('_');
    ctx.session.search_district = district;
    await ctx.editMessageText(neededDistrictMessage[ctx.session.lang], {
      reply_markup: backToDistricts[ctx.session.lang],
    });
  }

  @Action('back_to_r')
  async backToRegions(@Ctx() ctx: ContextType) {
    const buttons = this.buttonService.generateRegionButtons(
      0,
      ctx.session.lang,
    );
    await ctx.editMessageText(neededRegionMessage[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: [
          ...buttons.inline_keyboard,
          ...backToViewPatients[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }

  @Action('back_to_d')
  async backToDistricts(@Ctx() ctx: ContextType) {
    const buttons = this.buttonService.generateDistrictButtons(
      ctx.session.search_region,
      0,
      ctx.session.lang,
    );
    await ctx.editMessageText(neededDistrictMessage[ctx.session.lang], {
      reply_markup: {
        inline_keyboard: [
          ...buttons.inline_keyboard,
          ...backToRegions[ctx.session.lang].inline_keyboard,
        ],
      },
    });
  }

  @Action('back_to_view_patents')
  async backToViewPatients(@Ctx() ctx: ContextType) {
    await ctx.editMessageText(mainMessage[ctx.session.lang], {
      reply_markup: viewPatientsKeys[ctx.session.lang],
    });
  }
}
