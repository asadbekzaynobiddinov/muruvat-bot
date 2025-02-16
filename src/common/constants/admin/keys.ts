import { InlineKeyboardMarkup } from '@telegraf/types';
import { Markup } from 'telegraf';

export const adminMenu: InlineKeyboardMarkup = {
  inline_keyboard: [
    [
      Markup.button.callback('Sahiylar', 'generousesForAdmin'),
      Markup.button.callback('Sabrlilar', 'patientsForAdmin'),
    ],
  ],
};

export const genereouKeysForAdmin: InlineKeyboardMarkup = {
  inline_keyboard: [
    [
      Markup.button.callback(
        `Ism boyicha qidirish`,
        'searchGenerousByNameForAdmin',
      ),
    ],
    [
      Markup.button.callback(
        `Raqam bo'yischa qidirish`,
        'searchGenerousByPhone',
      ),
    ],
    [Markup.button.callback('Barcha Sahiylar', 'searchAllGenerousForAdmin')],
    [Markup.button.callback('🔙 Ortga qaytish', 'backToAdminMenu')],
  ],
};

export const patientsKeysForAdmin: InlineKeyboardMarkup = {
  inline_keyboard: [
    [
      Markup.button.callback('Barcha Sabrlilar', 'allPatientsForAdmin'),
      Markup.button.callback(`Hudud Bo'yicha`, 'patientsByLocationForAdmin'),
    ],
    [
      Markup.button.callback(`Jins va yoshi`, 'patientsByGenderAgeForAdmin'),
      Markup.button.callback(
        `Jins va o'lchami`,
        'patientsByGenderSizeForAdmin',
      ),
    ],
    [Markup.button.callback('🔙 Ortga qaytish', 'backToAdminMenu')],
  ],
};

export const backToViewGenerousesForAdmin: InlineKeyboardMarkup = {
  inline_keyboard: [
    [
      Markup.button.callback(
        '🔙 Ortga qaytish',
        'backToViewGenerousesForAdmin',
      ),
    ],
  ],
};

export const backToViewPatientsForAdmin: InlineKeyboardMarkup = {
  inline_keyboard: [
    [Markup.button.callback('🔙 Ortga qaytish', 'backToViewPatientsForAdmin')],
  ],
};

export const backToRegionsForAdmin: InlineKeyboardMarkup = {
  inline_keyboard: [
    [Markup.button.callback('🔙 Ortga qaytish', 'backToRegionsForAdmin')],
  ],
};

export const backToDistrictsForAdmin: InlineKeyboardMarkup = {
  inline_keyboard: [
    [Markup.button.callback('🔙 Ortga qaytish', 'backToDistrictsForAdmin')],
  ],
};
