import { Context } from 'telegraf';
import { SceneContext } from 'telegraf/typings/scenes';

export type ContextType = Context &
  SceneContext & {
    session: {
      lang: string;
      search: {
        region: string;
        district: string;
        gender: string;
        down: number;
        up: number;
        size: string;
      };
    };
  };

export type DbOptions = {
  page?: number;
  gender?: string;
  up?: number;
  down?: number;
  size?: string;
  region?: string;
  district?: string;
};
