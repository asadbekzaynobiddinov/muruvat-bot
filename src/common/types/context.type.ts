import { Context } from 'telegraf';
import { SceneContext } from 'telegraf/typings/scenes';

export type ContextType = Context &
  SceneContext & {
    session: {
      lang: string;
      search_region: string;
      search_district: string;
      search_gender: 'male' | 'femalae';
      past: number;
      yuqori: number;
      search_size: string;
    };
  };
