import { Context } from 'telegraf';

export type ContextType = Context & {
  session: {
    lang: string;
  };
};
