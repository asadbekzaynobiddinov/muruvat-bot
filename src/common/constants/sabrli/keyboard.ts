import { Markup } from 'telegraf';
import { InlineKeyboardMarkup } from 'telegraf/typings/core/types/typegram';

export const patientMenuKeys: Record<string, InlineKeyboardMarkup> = {
  uz: {
    inline_keyboard: [
      [Markup.button.callback(`🤲 Murojat Yo'llash`, 'apply')],
      [Markup.button.callback(`📞 Admin Bilan Bog'lanish`, 'toAdminAsPatient')],
      [Markup.button.callback('⚙️ Sozlamalar', 'settings_for_patient')],
    ],
  },
  en: {
    inline_keyboard: [
      [Markup.button.callback('🤲 Applying', 'apply')],
      [Markup.button.callback('📞 Contact Admin', 'toAdminAsPatient')],
      [Markup.button.callback('⚙️ Settings', 'settings_for_patient')],
    ],
  },
  ru: {
    inline_keyboard: [
      [Markup.button.callback('🤲 Отправить заявку', 'apply')],
      [
        Markup.button.callback(
          '📞 Связаться с администратором',
          'toAdminAsPatient',
        ),
      ],
      [Markup.button.callback('⚙️ Настройки', 'settings_for_patient')],
    ],
  },
};
export const backToRegionsForPatient: Record<string, InlineKeyboardMarkup> = {
  uz: {
    inline_keyboard: [
      [Markup.button.callback('🔙 Ortga qaytish', 'back_to_r_for_p')],
    ],
  },
  ru: {
    inline_keyboard: [[Markup.button.callback('🔙 Назад', 'back_to_r_for_p')]],
  },
  en: {
    inline_keyboard: [[Markup.button.callback('🔙 Back', 'back_to_r_for_p')]],
  },
};

export const langForPatientKeys = {
  inline_keyboard: [
    [Markup.button.callback("🇺🇿 O'zbekcha", 'setUzPatient')],
    [Markup.button.callback('🇷🇺 Русский', 'setRuPatient')],
    [Markup.button.callback('🇺🇸 English', 'setEnPatient')],
  ],
};
export const settingsKeysForPatient = {
  uz: {
    inline_keyboard: [
      [
        Markup.button.callback(
          `📞 Raqamni o'zgartirish`,
          'change_phone_of_patient',
        ),
        Markup.button.callback(
          `🌐 Tilni o'zgartirish`,
          'change_lang_of_patient',
        ),
      ],
    ],
  },
  ru: {
    inline_keyboard: [
      [
        Markup.button.callback(`📞 Изменить номер`, 'change_phone_of_patient'),
        Markup.button.callback(`🌐 Изменить язык`, 'change_lang_of_patient'),
      ],
    ],
  },
  en: {
    inline_keyboard: [
      [
        Markup.button.callback(`📞 Change phone`, 'change_phone_of_patient'),
        Markup.button.callback(`🌐 Change language`, 'change_lang_of_patient'),
      ],
    ],
  },
};
export const genderForPatient: Record<string, InlineKeyboardMarkup> = {
  uz: {
    inline_keyboard: [
      [
        Markup.button.callback('Erkak', 'male_patient'),
        Markup.button.callback('Ayol', 'female_patient'),
      ],
    ],
  },
  ru: {
    inline_keyboard: [
      [
        Markup.button.callback('Мужчина', 'male_patient'),
        Markup.button.callback('Женщина', 'female_patient'),
      ],
    ],
  },
  en: {
    inline_keyboard: [
      [
        Markup.button.callback('Male', 'male_patient'),
        Markup.button.callback('Female', 'female_patient'),
      ],
    ],
  },
};
export const backToPatientMenu: Record<string, InlineKeyboardMarkup> = {
  uz: {
    inline_keyboard: [
      [Markup.button.callback('🔙 Ortga qaytish', 'back_to_patient_menu')],
    ],
  },
  ru: {
    inline_keyboard: [
      [Markup.button.callback('🔙 Назад', 'back_to_patient_menu')],
    ],
  },
  en: {
    inline_keyboard: [
      [Markup.button.callback('🔙 Back', 'back_to_patient_menu')],
    ],
  },
};
export const sizeByAgeKeys: Record<string, InlineKeyboardMarkup> = {
  uz: {
    inline_keyboard: [[Markup.button.callback("Yosh bo'yicha", 'by_age')]],
  },
  ru: {
    inline_keyboard: [[Markup.button.callback('По возрасту', 'by_age')]],
  },
  en: {
    inline_keyboard: [[Markup.button.callback('By Age', 'by_age')]],
  },
};
export const sizePatientStuffKeys: InlineKeyboardMarkup = {
  inline_keyboard: [
    [
      Markup.button.callback('XS - 32-34', 'StuffSize=xs'),
      Markup.button.callback('S - 36-38', 'StuffSize=s'),
    ],
    [
      Markup.button.callback('M - 40-42', 'StuffSize=m'),
      Markup.button.callback('L - 44-46', 'StuffSize=l'),
    ],
    [
      Markup.button.callback('XL - 48-50', 'StuffSize=xl'),
      Markup.button.callback('XXL - 52-54', 'StuffSize=xxl'),
    ],
  ],
};
