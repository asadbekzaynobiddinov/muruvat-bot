import { Context } from 'telegraf';
import { SceneContext } from 'telegraf/typings/scenes';

export type ContextType = Context &
  SceneContext & {
    session: {
      lang: string;
      lastMessage: any;
      search: {
        region: string;
        district: string;
        gender: string;
        down: number;
        up: number;
        size: string;
        page: number;
      };
      patientApp: {
        id: string;
      };
      generousNavigation: {
        RegionPage: number;
        DistrictPage: number;
      };
      applicationId: number;
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
