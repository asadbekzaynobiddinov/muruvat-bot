import { InjectRepository } from '@nestjs/typeorm';
import { Scene, SceneEnter, On } from 'nestjs-telegraf';
import { generousNameMessage } from 'src/common/constants';
import { ContextType } from 'src/common/types';
import { UsersEntity, UsersRepository } from 'src/core';

@Scene('registerAsGenerous')
export class RegisterAsGenerous {
  constructor(
    @InjectRepository(UsersEntity) private readonly userRepo: UsersRepository,
  ) {}
  @SceneEnter()
  async onEnter(ctx: ContextType) {
    await ctx.editMessageText(generousNameMessage[ctx.session.lang]);
  }

  @On('text')
  async textHandler(ctx: ContextType) {
    if ('text' in ctx.message) {
      const text = ctx.message.text;
      console.log(text);
    }
  }
}
