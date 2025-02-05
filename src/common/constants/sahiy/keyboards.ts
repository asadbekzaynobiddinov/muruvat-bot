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

export const mainMenuKeys = {
  uz: {
    inline_keyboard: [
      [
        Markup.button.callback('🤲 Muruvat Qilish', 'repair'),
        Markup.button.callback(`👀 Sabrlilarni ko'rish`, 'view_patients'),
      ],
      [Markup.button.callback(`📞 Admin Bilan Bog'lanish`, 'to_admin')],
      [Markup.button.callback('⚙️ Sozlamalar', 'settings')],
    ],
  },
  en: {
    inline_keyboard: [
      [
        Markup.button.callback('🤲 Be Generous', 'repair'),
        Markup.button.callback('👀 View Patients', 'view_patients'),
      ],
      [Markup.button.callback('📞 Contact Admin', 'toAdminAsGenerous')],
      [Markup.button.callback('⚙️ Settings', 'settings')],
    ],
  },
  ru: {
    inline_keyboard: [
      [
        Markup.button.callback('🤲 Быть щедрым', 'repair'),
        Markup.button.callback('👀 Посмотреть пациентов', 'view_patients'),
      ],
      [Markup.button.callback('📞 Связаться с администратором', 'to_admin')],
      [Markup.button.callback('⚙️ Настройки', 'settings')],
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

export const repairKeys = {
  uz: {
    inline_keyboard: [[Markup.button.callback('👤 Istalgan odamga', 'anyone')]],
  },
  ru: {
    inline_keyboard: [[Markup.button.callback('👤 Любому человеку', 'anyone')]],
  },
  en: {
    inline_keyboard: [[Markup.button.callback('👤 To anyone', 'anyone')]],
  },
};

export const viewPatientsKeys = {
  uz: {
    inline_keyboard: [
      [
        Markup.button.callback('👥 Barcha Sabrlilar', 'all_patientd'),
        Markup.button.callback(`📍 Hudud Bo'yicha`, 'by_region'),
      ],
      [Markup.button.callback(`👫 Jins va Yoshi bo'yicha`, 'by_gender_age')],
      [
        Markup.button.callback(
          `📏 Jins va O'lchami bo'yicha`,
          'by_gender_size',
        ),
      ],
      [Markup.button.callback('🔙 Ortga qaytish', 'backt_to_menu')],
    ],
  },
};
