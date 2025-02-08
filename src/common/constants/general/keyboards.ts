import { Markup } from 'telegraf';
import { InlineKeyboardMarkup } from 'telegraf/typings/core/types/typegram';

export const selectLangKeys: InlineKeyboardMarkup = {
  inline_keyboard: [
    [Markup.button.callback("🇺🇿 O'zbekcha", 'uz')],
    [Markup.button.callback('🇷🇺 Русский', 'ru')],
    [Markup.button.callback('🇺🇸 English', 'en')],
  ],
};

export const registerMenuKeys = {
  uz: {
    inline_keyboard: [
      [
        Markup.button.callback('👨 Sahiy', 'generous'),
        Markup.button.callback('👨 Sabrli', 'patient'),
      ],
    ],
  },
  en: {
    inline_keyboard: [
      [
        Markup.button.callback('👨 Generous', 'generous'),
        Markup.button.callback('👨 Patient', 'patient'),
      ],
    ],
  },
  ru: {
    inline_keyboard: [
      [
        Markup.button.callback('👨 Щедрый', 'generous'),
        Markup.button.callback('👨 Пациент', 'patient'),
      ],
    ],
  },
};

export const phoneNumberKeys = {
  uz: {
    keyboard: [[Markup.button.contactRequest('📞 Telefon raqamni yuborish')]],
    resize_keyboard: true,
    one_time_keyboard: true,
  },
  ru: {
    keyboard: [[Markup.button.contactRequest('📞 Отправить номер телефона')]],
    resize_keyboard: true,
    one_time_keyboard: true,
  },
  en: {
    keyboard: [[Markup.button.contactRequest('📞 Send phone number')]],
    resize_keyboard: true,
    one_time_keyboard: true,
  },
};

export const settingsKeys = {
  uz: {
    inline_keyboard: [
      [
        Markup.button.callback(`📞 Raqamni o'zgartirish`, 'change_phone'),
        Markup.button.callback(`🌐 Tilni o'zgartirish`, 'change_lang'),
      ],
    ],
  },
  ru: {
    inline_keyboard: [
      [
        Markup.button.callback(`📞 Изменить номер`, 'change_phone'),
        Markup.button.callback(`🌐 Изменить язык`, 'change_lang'),
      ],
    ],
  },
  en: {
    inline_keyboard: [
      [
        Markup.button.callback(`📞 Change phone`, 'change_phone'),
        Markup.button.callback(`🌐 Change language`, 'change_lang'),
      ],
    ],
  },
};

export const backToRegions: Record<string, InlineKeyboardMarkup> = {
  uz: {
    inline_keyboard: [
      [Markup.button.callback('🔙 Ortga qaytish', 'back_to_r')],
    ],
  },
  ru: {
    inline_keyboard: [[Markup.button.callback('🔙 Назад', 'back_to_r')]],
  },
  en: {
    inline_keyboard: [[Markup.button.callback('🔙 Back', 'back_to_r')]],
  },
};

export const backToDistricts: Record<string, InlineKeyboardMarkup> = {
  uz: {
    inline_keyboard: [
      [Markup.button.callback('🔙 Ortga qaytish', 'back_to_d')],
    ],
  },
  ru: {
    inline_keyboard: [[Markup.button.callback('🔙 Назад', 'back_to_d')]],
  },
  en: {
    inline_keyboard: [[Markup.button.callback('🔙 Back', 'back_to_d')]],
  },
};
