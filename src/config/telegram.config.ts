import {
  TelegrafModuleOptions,
  TelegrafModuleAsyncOptions,
} from 'nestjs-telegraf';
import { session } from 'telegraf';
import { config } from './index';

const telegrafModuleOptions = (): TelegrafModuleOptions => {
  return {
    token: config.TOKEN,
    middlewares: [
      session(),
      async (ctx, next) => {
        if (!ctx.session) {
          ctx.session = {};
        }
        ctx.session.search = ctx.session.search || {};
        await next();
      },
    ],
  };
};

export const options = (): TelegrafModuleAsyncOptions => {
  return {
    useFactory: () => telegrafModuleOptions(),
  };
};
