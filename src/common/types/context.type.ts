import { Context } from 'telegraf';
import { SceneContext } from 'telegraf/typings/scenes';

export type ContextType = Context &
  SceneContext & {
    reply_to_message_id?: any;
    session: {
      lang: string;
      lastMessage: any;
      userId: number;
      search: {
        region: string;
        district: string;
        gender: string;
        down: number;
        up: number;
        size: string;
        page: number;
        name: string;
        phone_number: string;
      };
      patientApp: {
        id: string;
      };
      generousNavigation: {
        RegionPage: number;
        DistrictPage: number;
      };
      adminNavigation: {
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
