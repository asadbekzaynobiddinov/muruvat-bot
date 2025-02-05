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

export const generousMenuKeys = {
  uz: {
    inline_keyboard: [
      [
        Markup.button.callback('🤲 Muruvat Qilish', 'repair'),
        Markup.button.callback(
          `👀 Sabrlilarni ko'rish`,
          'view_patients_for_generous',
        ),
      ],
      [
        Markup.button.callback(
          `📞 Admin Bilan Bog'lanish`,
          'toAdminAsGenerous',
        ),
      ],
      [Markup.button.callback('⚙️ Sozlamalar', 'settings_for_generous')],
    ],
  },
  en: {
    inline_keyboard: [
      [
        Markup.button.callback('🤲 Be Generous', 'repair'),
        Markup.button.callback(
          '👀 View Patients',
          'view_patients_for_generous',
        ),
      ],
      [Markup.button.callback('📞 Contact Admin', 'toAdminAsGenerous')],
      [Markup.button.callback('⚙️ Settings', 'settings_for_generous')],
    ],
  },
  ru: {
    inline_keyboard: [
      [
        Markup.button.callback('🤲 Быть щедрым', 'repair'),
        Markup.button.callback(
          '👀 Посмотреть пациентов',
          'view_patients_for_generous',
        ),
      ],
      [
        Markup.button.callback(
          '📞 Связаться с администратором',
          'toAdminAsGenerous',
        ),
      ],
      [Markup.button.callback('⚙️ Настройки', 'settings_for_generous')],
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
    inline_keyboard: [
      [Markup.button.callback('👤 Istalgan odamga', 'anyone')],
      [Markup.button.callback('🔙 Ortga qaytish', 'back_to_generous_menu')],
    ],
  },
  ru: {
    inline_keyboard: [
      [Markup.button.callback('👤 Любому человеку', 'anyone')],
      [Markup.button.callback('🔙 Назад', 'back_to_generous_menu')],
    ],
  },
  en: {
    inline_keyboard: [
      [Markup.button.callback('👤 To anyone', 'anyone')],
      [Markup.button.callback('🔙 Back', 'back_to_generous_menu')],
    ],
  },
};

export const generousViewPatientsKeys = {
  uz: {
    inline_keyboard: [
      [
        Markup.button.callback('👥 Barcha Sabrlilar', 'all_patientd'),
        Markup.button.callback(
          `📍 Hudud Bo'yicha`,
          'patient_by_region_for_generous',
        ),
      ],
      [
        Markup.button.callback(
          `👫 Jins va Yoshi bo'yicha`,
          'patient_by_gender_age',
        ),
      ],
      [
        Markup.button.callback(
          `📏 Jins va O'lchami bo'yicha`,
          'patient_by_gender_size',
        ),
      ],
      [Markup.button.callback('🔙 Ortga qaytish', 'back_to_generous_menu')],
    ],
  },
  ru: {
    inline_keyboard: [
      [
        Markup.button.callback('👥 Все пациенты', 'all_patientd'),
        Markup.button.callback(
          '📍 По региону',
          'patient_by_region_for_generous',
        ),
      ],
      [
        Markup.button.callback(
          '👫 По полу и возрасту',
          'patient_by_gender_age',
        ),
      ],
      [
        Markup.button.callback(
          '📏 По полу и размеру',
          'patient_by_gender_size',
        ),
      ],
      [Markup.button.callback('🔙 Назад', 'back_to_generous_menu')],
    ],
  },
  en: {
    inline_keyboard: [
      [
        Markup.button.callback('👥 All Patients', 'all_patientd'),
        Markup.button.callback(
          '📍 By Region',
          'patient_by_region_for_generous',
        ),
      ],
      [Markup.button.callback('👫 By Gender and Age', 'patient_by_gender_age')],
      [
        Markup.button.callback(
          '📏 By Gender and Size',
          'patient_by_gender_size',
        ),
      ],
      [Markup.button.callback('🔙 Back', 'back_to_generous_menu')],
    ],
  },
};

export const generousSettingsKeys = {
  uz: {
    inline_keyboard: [
      [
        Markup.button.callback(`📞 Raqamni o'zgartirish`, 'change_phone'),
        Markup.button.callback(`🌐 Tilni o'zgartirish`, 'change_lang'),
      ],
      [Markup.button.callback(`🔙 Ortga qaytish`, 'back_to_generous_menu')],
    ],
  },
  ru: {
    inline_keyboard: [
      [
        Markup.button.callback(`📞 Изменить номер`, 'change_phone'),
        Markup.button.callback(`🌐 Изменить язык`, 'change_lang'),
      ],
      [Markup.button.callback(`🔙 Назад`, 'back_to_generous_menu')],
    ],
  },
  en: {
    inline_keyboard: [
      [
        Markup.button.callback(`📞 Change phone`, 'change_phone'),
        Markup.button.callback(`🌐 Change language`, 'change_lang'),
      ],
      [Markup.button.callback(`🔙 Back`, 'back_to_generous_menu')],
    ],
  },
};

export const regionKeysforGenerous = {
  uz: {
    inline_keyboard: [
      [
        Markup.button.callback('Toshkent', 'region_tashkent'),
        Markup.button.callback('Samarqand', 'region_samarkand'),
      ],
      [
        Markup.button.callback('Buxoro', 'region_bukhara'),
        Markup.button.callback('Andijon', 'region_andijan'),
      ],
      [
        Markup.button.callback("Farg'ona", 'region_fergana'),
        Markup.button.callback('Namangan', 'region_namangan'),
      ],
      [
        Markup.button.callback('Qashqadaryo', 'region_qashqadarya'),
        Markup.button.callback('Jizzax', 'region_jizzakh'),
      ],
      [
        Markup.button.callback('Sirdaryo', 'region_syrdarya'),
        Markup.button.callback('Xorazm', 'region_khorezm'),
      ],
      [
        Markup.button.callback('Navoiy', 'region_navoiy'),
        Markup.button.callback('Surxondaryo', 'region_surxondarya'),
      ],
      [Markup.button.callback("Qoraqalpog'iston", 'region_karakalpakstan')],
      [
        Markup.button.callback(
          '🔙 Ortga qaytish',
          'view_patients_for_generous',
        ),
      ],
    ],
  },
  ru: {
    inline_keyboard: [
      [
        Markup.button.callback('Ташкент', 'region_tashkent'),
        Markup.button.callback('Самарканд', 'region_samarkand'),
      ],
      [
        Markup.button.callback('Бухара', 'region_bukhara'),
        Markup.button.callback('Андижан', 'region_andijan'),
      ],
      [
        Markup.button.callback('Фергана', 'region_fergana'),
        Markup.button.callback('Наманган', 'region_namangan'),
      ],
      [
        Markup.button.callback('Кашкадарья', 'region_qashqadarya'),
        Markup.button.callback('Джизак', 'region_jizzakh'),
      ],
      [
        Markup.button.callback('Сырдарья', 'region_syrdarya'),
        Markup.button.callback('Хорезм', 'region_khorezm'),
      ],
      [
        Markup.button.callback('Навои', 'region_navoiy'),
        Markup.button.callback('Сурхандарья', 'region_surxondarya'),
      ],
      [Markup.button.callback('Каракалпакстан', 'region_karakalpakstan')],
      [Markup.button.callback('🔙 Назад', 'view_patients_for_generous')],
    ],
  },
  en: {
    inline_keyboard: [
      [
        Markup.button.callback('Tashkent', 'region_tashkent'),
        Markup.button.callback('Samarkand', 'region_samarkand'),
      ],
      [
        Markup.button.callback('Bukhara', 'region_bukhara'),
        Markup.button.callback('Andijan', 'region_andijan'),
      ],
      [
        Markup.button.callback('Fergana', 'region_fergana'),
        Markup.button.callback('Namangan', 'region_namangan'),
      ],
      [
        Markup.button.callback('Qashqadarya', 'region_qashqadarya'),
        Markup.button.callback('Jizzakh', 'region_jizzakh'),
      ],
      [
        Markup.button.callback('Syrdarya', 'region_syrdarya'),
        Markup.button.callback('Khorezm', 'region_khorezm'),
      ],
      [
        Markup.button.callback('Navoiy', 'region_navoiy'),
        Markup.button.callback('Surxondarya', 'region_surxondarya'),
      ],
      [Markup.button.callback('Karakalpakstan', 'region_karakalpakstan')],
      [Markup.button.callback('🔙 Back', 'view_patients_for_generous')],
    ],
  },
};
