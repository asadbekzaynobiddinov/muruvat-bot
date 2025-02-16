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

export const gendersForAgeForAdmin: InlineKeyboardMarkup = {
  inline_keyboard: [
    [
      Markup.button.callback('Erkak', 'genAndAgeForAdmin_male'),
      Markup.button.callback('Ayol', 'genAndAgeForAdmin_female'),
    ],
  ],
};

export const ageKeysForAdmin: InlineKeyboardMarkup = {
  inline_keyboard: [
    [
      Markup.button.callback('3 yoshgacha', 'searchAgeForAdmin_0_3'),
      Markup.button.callback('3 - 6 yosh', 'searchAgeForAdmin_3_6'),
    ],
    [
      Markup.button.callback('6 - 9 yosh', 'searchAgeForAdmin_6_9'),
      Markup.button.callback('9 - 12 yosh', 'searchAgeForAdmin_9_12'),
    ],
    [
      Markup.button.callback('12 - 15 yosh', 'searchAgeForAdmin_12_15'),
      Markup.button.callback('15 dan yuqori', 'searchAgeForAdmin_15_100'),
    ],
  ],
};

export const backToGendersFromAgeForAdmin: InlineKeyboardMarkup = {
  inline_keyboard: [
    [
      Markup.button.callback(
        '🔙 Ortga qaytish',
        'backToGendersFromAgeForAdmin',
      ),
    ],
  ],
};

export const backToAgesForAdmin: InlineKeyboardMarkup = {
  inline_keyboard: [
    [Markup.button.callback('🔙 Ortga qaytish', 'backToAgesForAdmin')],
  ],
};

export const gendersForSizeForAdmin: InlineKeyboardMarkup = {
  inline_keyboard: [
    [
      Markup.button.callback('Erkak', 'genAndSizeForAdmin_male'),
      Markup.button.callback('Ayol', 'genAndSizeFOrAdmin_female'),
    ],
  ],
};

export const sizeKeysForAdmin: InlineKeyboardMarkup = {
  inline_keyboard: [
    [
      Markup.button.callback('XS - 32-34', 'sizeForAdmin_xs'),
      Markup.button.callback('S - 36-38', 'sizeForAdmin_s'),
    ],
    [
      Markup.button.callback('M - 40-42', 'sizeForAdmin_m'),
      Markup.button.callback('L - 44-46', 'sizeForAdmin_l'),
    ],
    [
      Markup.button.callback('XL - 48-50', 'sizeForAdmin_xl'),
      Markup.button.callback('XXL - 52-54', 'sizeForAdmin_xxl'),
    ],
  ],
};

export const backToGendersFromSizeForAdmin: InlineKeyboardMarkup = {
  inline_keyboard: [
    [
      Markup.button.callback(
        '🔙 Ortga qaytish',
        'backToGendersFromSizeForAdmin',
      ),
    ],
  ],
};

export const backToSizeForAdmin: InlineKeyboardMarkup = {
  inline_keyboard: [
    [Markup.button.callback('🔙 Ortga qaytish', 'backToSizeForAdmin')],
  ],
};
