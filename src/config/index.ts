import * as dotenv from 'dotenv';
dotenv.config();

export type ConfigType = {
  PORT: number;
  DB_URL: string;
  TOKEN: string;
  TG_CHANNEL: string;
  BOT_URL: string;
  GENEREOUS_APPLICATIONS_CHANEL: string;
  PATIENT_APPLICATIONS_CHANEL: string;
};

export const config: ConfigType = {
  PORT: Number(process.env.PORT) as number,
  DB_URL: process.env.DB_URL as string,
  TOKEN: process.env.TOKEN,
  TG_CHANNEL: process.env.TG_CHANNEL as string,
  BOT_URL: process.env.BOT_URL as string,
  GENEREOUS_APPLICATIONS_CHANEL: process.env.GENEREOUS_APPLICATIONS_CHANEL,
  PATIENT_APPLICATIONS_CHANEL: process.env.PATIENT_APPLICATIONS_CHANEL,
};
