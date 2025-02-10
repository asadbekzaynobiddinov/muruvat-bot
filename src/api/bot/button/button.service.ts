import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InlineKeyboardMarkup } from '@telegraf/types';
import {
  andijanCityKeys,
  bukharaCityKeys,
  ferganaCitysKeys,
  Genders,
  jizzaxCityKeys,
  karakalpakstanCityKeys,
  namanganCityKeys,
  navoiCityKeys,
  qashqadaryaCityKeys,
  regionKeys,
  samarkandCityKeys,
  sirdaryoCityKeys,
  surxandaryaCityKeys,
  tashkentCitysKeys,
  tashkentRegionCitysKeys,
  xorazmCityKeys,
} from 'src/common';
import {
  PatientsEntity,
  PatientsRepository,
  UsersEntity,
  UsersRepository,
} from 'src/core';
import { Markup } from 'telegraf';
import { Between } from 'typeorm';

@Injectable()
export class ButtonsService {
  constructor(
    @InjectRepository(PatientsEntity)
    private readonly patintsRepo: PatientsRepository,
    @InjectRepository(UsersEntity) private readonly userRepo: UsersRepository,
  ) {}
  private perPage = 5;

  private navigationLabels = {
    uz: { back: '⬅️ Orqaga', next: 'Oldinga ➡️' },
    ru: { back: '⬅️ Назад', next: 'Вперёд ➡️' },
    en: { back: '⬅️ Back', next: 'Next ➡️' },
  };

  generateRegionButtons(page: number, lang: any): InlineKeyboardMarkup {
    const start = page * this.perPage;
    const end = start + this.perPage;
    const totalPages = Math.ceil(regionKeys[lang].length / this.perPage);

    const buttons = regionKeys[lang]
      .slice(start, end)
      .map(([text, callback]) => {
        return [Markup.button.callback(text, callback)];
      });

    const navButtons = [];
    if (page > 0) {
      navButtons.push(
        Markup.button.callback(
          this.navigationLabels[lang].back,
          `pageRegion_${page - 1}`,
        ),
      );
    }
    if (page < totalPages - 1) {
      navButtons.push(
        Markup.button.callback(
          this.navigationLabels[lang].next,
          `pageRegion_${page + 1}`,
        ),
      );
    }

    if (navButtons.length) {
      buttons.push(navButtons);
    }

    return { inline_keyboard: buttons };
  }

  generateDistrictButtons(
    region: string,
    page: number,
    lang: any,
  ): InlineKeyboardMarkup {
    const start = page * this.perPage;
    const end = start + this.perPage;
    let totalPages: number;

    let buttons: any[][];

    switch (region) {
      case 'toshkent shahar':
        totalPages = Math.ceil(tashkentCitysKeys[lang].length / this.perPage);
        buttons = tashkentCitysKeys[lang]
          .slice(start, end)
          .map(([text, callback]) => {
            return [Markup.button.callback(text, callback)];
          });
        break;
      case 'toshkent viloyat':
        totalPages = Math.ceil(
          tashkentRegionCitysKeys[lang].length / this.perPage,
        );
        buttons = tashkentRegionCitysKeys[lang]
          .slice(start, end)
          .map(([text, callback]) => {
            return [Markup.button.callback(text, callback)];
          });
        break;
      case 'samarqand':
        totalPages = Math.ceil(samarkandCityKeys[lang].length / this.perPage);
        buttons = samarkandCityKeys[lang]
          .slice(start, end)
          .map(([text, callback]) => {
            return [Markup.button.callback(text, callback)];
          });
        break;
      case 'buxoro':
        totalPages = Math.ceil(bukharaCityKeys[lang].length / this.perPage);
        buttons = bukharaCityKeys[lang]
          .slice(start, end)
          .map(([text, callback]) => {
            return [Markup.button.callback(text, callback)];
          });
        break;
      case 'andijon':
        totalPages = Math.ceil(andijanCityKeys[lang].length / this.perPage);
        buttons = andijanCityKeys[lang]
          .slice(start, end)
          .map(([text, callback]) => {
            return [Markup.button.callback(text, callback)];
          });
        break;
      case 'fargona':
        totalPages = Math.ceil(ferganaCitysKeys[lang].length / this.perPage);
        buttons = ferganaCitysKeys[lang]
          .slice(start, end)
          .map(([text, callback]) => {
            return [Markup.button.callback(text, callback)];
          });
        break;
      case 'namangan':
        totalPages = Math.ceil(namanganCityKeys[lang].length / this.perPage);
        buttons = namanganCityKeys[lang]
          .slice(start, end)
          .map(([text, callback]) => {
            return [Markup.button.callback(text, callback)];
          });
        break;
      case 'qashqadaryo':
        totalPages = Math.ceil(qashqadaryaCityKeys[lang].length / this.perPage);
        buttons = qashqadaryaCityKeys[lang]
          .slice(start, end)
          .map(([text, callback]) => {
            return [Markup.button.callback(text, callback)];
          });
        break;
      case 'jizzax':
        totalPages = Math.ceil(jizzaxCityKeys[lang].length / this.perPage);
        buttons = jizzaxCityKeys[lang]
          .slice(start, end)
          .map(([text, callback]) => {
            return [Markup.button.callback(text, callback)];
          });
        break;
      case 'sirdaryo':
        totalPages = Math.ceil(sirdaryoCityKeys[lang].length / this.perPage);
        buttons = sirdaryoCityKeys[lang]
          .slice(start, end)
          .map(([text, callback]) => {
            return [Markup.button.callback(text, callback)];
          });
        break;
      case 'xorazm':
        totalPages = Math.ceil(xorazmCityKeys[lang].length / this.perPage);
        buttons = xorazmCityKeys[lang]
          .slice(start, end)
          .map(([text, callback]) => {
            return [Markup.button.callback(text, callback)];
          });
        break;
      case 'navoiy':
        totalPages = Math.ceil(navoiCityKeys[lang].length / this.perPage);
        buttons = navoiCityKeys[lang]
          .slice(start, end)
          .map(([text, callback]) => {
            return [Markup.button.callback(text, callback)];
          });
        break;
      case 'surxondaryo':
        totalPages = Math.ceil(surxandaryaCityKeys[lang].length / this.perPage);
        buttons = surxandaryaCityKeys[lang]
          .slice(start, end)
          .map(([text, callback]) => {
            return [Markup.button.callback(text, callback)];
          });
        break;
      case 'qoraqalpogiston':
        totalPages = Math.ceil(
          karakalpakstanCityKeys[lang].length / this.perPage,
        );
        buttons = karakalpakstanCityKeys[lang]
          .slice(start, end)
          .map(([text, callback]) => {
            return [Markup.button.callback(text, callback)];
          });
        break;
      default:
        break;
    }

    const navButtons = [];
    if (page > 0) {
      navButtons.push(
        Markup.button.callback(
          this.navigationLabels[lang].back,
          `pageDistrict_${page - 1}`,
        ),
      );
    }
    if (page < totalPages - 1) {
      navButtons.push(
        Markup.button.callback(
          this.navigationLabels[lang].next,
          `pageDistrict_${page + 1}`,
        ),
      );
    }

    if (navButtons.length) {
      buttons.push(navButtons);
    }
    return { inline_keyboard: buttons };
  }

  async generatePatientsButtons(
    filters: Partial<{
      gender: Genders;
      age: [number, number];
      size: string;
      region: string;
      district: string;
    }>,
    page: number,
  ) {
    const skip = (page - 1) * 10;
    const take = 10;

    const where: any = {};
    if (filters.gender) where.gender = filters.gender;
    if (filters.age) where.age = Between(filters.age[0], filters.age[1]);
    if (filters.size) where.size = filters.size;
    if (filters.region) where.region = filters.region;
    if (filters.district) where.district = filters.district;

    const patients = await this.patintsRepo.find({ where, skip, take });

    if (patients.length === 0) {
      return false;
    }

    const text = patients
      .map((p, i) => `${skip + i + 1}. ${p.name}`)
      .join('\n');

    const buttons = [];
    for (let i = 0; i < patients.length; i += 5) {
      buttons.push(
        patients.slice(i, i + 5).map((p, index) => ({
          text: (skip + i + index + 1).toString(),
          callback_data: `patient_${p.id}`,
        })),
      );
    }

    const navigationButtons = [];
    if (page > 1)
      navigationButtons.push({
        text: '⬅️ Oldingi',
        callback_data: `page_${page - 1}`,
      });
    if (patients.length === take)
      navigationButtons.push({
        text: '➡️ Keyingi',
        callback_data: `page_${page + 1}`,
      });

    if (navigationButtons.length) {
      buttons.push(navigationButtons);
    }

    return { text, buttons };
  }
}
