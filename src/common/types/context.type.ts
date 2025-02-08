import { Context } from 'telegraf';
import { SceneContext } from 'telegraf/typings/scenes';

export type ContextType = Context &
  SceneContext & {
    session: {
      lang: string;
      search_region: string;
      search_district: string;
    };
  };
