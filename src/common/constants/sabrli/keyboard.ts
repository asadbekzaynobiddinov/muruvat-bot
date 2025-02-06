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

export const patientMenuKeys = {
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

export const patientSettingsKeys = {
  uz: {
    inline_keyboard: [
      [
        Markup.button.callback(`📞 Raqamni o'zgartirish`, 'change_phone'),
        Markup.button.callback(`🌐 Tilni o'zgartirish`, 'change_lang'),
      ],
      [Markup.button.callback(`🔙 Ortga qaytish`, 'back_to_patient_menu')],
    ],
  },
  ru: {
    inline_keyboard: [
      [
        Markup.button.callback(`📞 Изменить номер`, 'change_phone'),
        Markup.button.callback(`🌐 Изменить язык`, 'change_lang'),
      ],
      [Markup.button.callback(`🔙 Назад`, 'back_to_patient_menu')],
    ],
  },
  en: {
    inline_keyboard: [
      [
        Markup.button.callback(`📞 Change phone`, 'change_phone'),
        Markup.button.callback(`🌐 Change language`, 'change_lang'),
      ],
      [Markup.button.callback(`🔙 Back`, 'back_to_patient_menu')],
    ],
  },
};

export const regionKeysforPatients = {
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
    ],
  },
};
