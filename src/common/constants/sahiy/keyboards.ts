import { Markup } from 'telegraf';
import { InlineKeyboardMarkup } from '@telegraf/types';

export const generousMenuKeys: Record<string, InlineKeyboardMarkup> = {
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

export const repairKeys: Record<string, InlineKeyboardMarkup> = {
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

export const viewPatientsKeys: Record<string, InlineKeyboardMarkup> = {
  uz: {
    inline_keyboard: [
      [
        Markup.button.callback('👥 Barcha Sabrlilar', 'all_patients'),
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
        Markup.button.callback('👥 Все пациенты', 'all_patients'),
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
        Markup.button.callback('👥 All Patients', 'all_patients'),
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

export const backToViewPatients: Record<string, InlineKeyboardMarkup> = {
  uz: {
    inline_keyboard: [
      [Markup.button.callback('🔙 Ortga qaytish', 'back_to_view_patents')],
    ],
  },
  ru: {
    inline_keyboard: [
      [Markup.button.callback('🔙 Назад', 'back_to_view_patents')],
    ],
  },
  en: {
    inline_keyboard: [
      [Markup.button.callback('🔙 Back', 'back_to_view_patents')],
    ],
  },
};

export const backToGenerosMenu: Record<string, InlineKeyboardMarkup> = {
  uz: {
    inline_keyboard: [
      [Markup.button.callback('🔙 Ortga qaytish', 'back_to_generous_menu')],
    ],
  },
  ru: {
    inline_keyboard: [
      [Markup.button.callback('🔙 Назад', 'back_to_generous_menu')],
    ],
  },
  en: {
    inline_keyboard: [
      [Markup.button.callback('🔙 Back', 'back_to_generous_menu')],
    ],
  },
};

export const backToChanges: Record<string, InlineKeyboardMarkup> = {
  uz: {
    inline_keyboard: [
      [Markup.button.callback('🔙 Ortga qaytish', 'back_to_changes')],
    ],
  },
  ru: {
    inline_keyboard: [[Markup.button.callback('🔙 Назад', 'back_to_changes')]],
  },
  en: {
    inline_keyboard: [[Markup.button.callback('🔙 Back', 'back_to_changes')]],
  },
};

export const ageKeys: Record<string, InlineKeyboardMarkup> = {
  uz: {
    inline_keyboard: [
      [
        Markup.button.callback('3 yoshgacha', 'age_0_3'),
        Markup.button.callback('3 - 6 yosh', 'age_3_6'),
      ],
      [
        Markup.button.callback('6 - 9 yosh', 'age_6_9'),
        Markup.button.callback('9 - 12 yosh', 'age_9_12'),
      ],
      [
        Markup.button.callback('12 - 15 yosh', 'age_12_15'),
        Markup.button.callback('15 dan yuqori', 'age_15_100'),
      ],
    ],
  },
  ru: {
    inline_keyboard: [
      [
        Markup.button.callback('До 3 лет', 'age_0_3'),
        Markup.button.callback('3 - 6 лет', 'age_3_6'),
      ],
      [
        Markup.button.callback('6 - 9 лет', 'age_6_9'),
        Markup.button.callback('9 - 12 лет', 'age_9_12'),
      ],
      [
        Markup.button.callback('12 - 15 лет', 'age_12_15'),
        Markup.button.callback('Старше 15', 'age_15_100'),
      ],
    ],
  },
  en: {
    inline_keyboard: [
      [
        Markup.button.callback('Under 3 years', 'age_0_3'),
        Markup.button.callback('3 - 6 years', 'age_3_6'),
      ],
      [
        Markup.button.callback('6 - 9 years', 'age_6_9'),
        Markup.button.callback('9 - 12 years', 'age_9_12'),
      ],
      [
        Markup.button.callback('12 - 15 years', 'age_12_15'),
        Markup.button.callback('Over 15 years', 'age_15_100'),
      ],
    ],
  },
};

export const genderForAgeKeys: Record<string, InlineKeyboardMarkup> = {
  uz: {
    inline_keyboard: [
      [
        Markup.button.callback('Erkak', 'genderForAge_male'),
        Markup.button.callback('Ayol', 'genderForAge_female'),
      ],
    ],
  },
  ru: {
    inline_keyboard: [
      [
        Markup.button.callback('Мужчина', 'genderForAge_male'),
        Markup.button.callback('Женщина', 'genderForAge_female'),
      ],
    ],
  },
  en: {
    inline_keyboard: [
      [
        Markup.button.callback('Male', 'genderForAge_male'),
        Markup.button.callback('Female', 'genderForAge_female'),
      ],
    ],
  },
};

export const genderForSizeKeys: Record<string, InlineKeyboardMarkup> = {
  uz: {
    inline_keyboard: [
      [
        Markup.button.callback('Erkak', 'genderForSize_male'),
        Markup.button.callback('Ayol', 'genderForSize_female'),
      ],
    ],
  },
  ru: {
    inline_keyboard: [
      [
        Markup.button.callback('Мужчина', 'genderForSize_male'),
        Markup.button.callback('Женщина', 'genderForSize_female'),
      ],
    ],
  },
  en: {
    inline_keyboard: [
      [
        Markup.button.callback('Male', 'genderForSize_male'),
        Markup.button.callback('Female', 'genderForSize_female'),
      ],
    ],
  },
};

export const backToGendersForAge: Record<string, InlineKeyboardMarkup> = {
  uz: {
    inline_keyboard: [
      [Markup.button.callback('🔙 Ortga qaytish', 'backToGenderForAge')],
    ],
  },
  ru: {
    inline_keyboard: [
      [Markup.button.callback('🔙 Назад', 'backToGenderForAge')],
    ],
  },
  en: {
    inline_keyboard: [
      [Markup.button.callback('🔙 Back', 'backToGenderForAge')],
    ],
  },
};

export const backToGendersForSize: Record<string, InlineKeyboardMarkup> = {
  uz: {
    inline_keyboard: [
      [Markup.button.callback('🔙 Ortga qaytish', 'backToGenderForSize')],
    ],
  },
  ru: {
    inline_keyboard: [
      [Markup.button.callback('🔙 Назад', 'backToGenderForSize')],
    ],
  },
  en: {
    inline_keyboard: [
      [Markup.button.callback('🔙 Back', 'backToGenderForSize')],
    ],
  },
};

export const backToAges: Record<string, InlineKeyboardMarkup> = {
  uz: {
    inline_keyboard: [
      [Markup.button.callback('🔙 Ortga qaytish', 'backToAgeForGenerous')],
    ],
  },
  ru: {
    inline_keyboard: [
      [Markup.button.callback('🔙 Назад', 'backToAgeForGenerous')],
    ],
  },
  en: {
    inline_keyboard: [
      [Markup.button.callback('🔙 Back', 'backToAgeForGenerous')],
    ],
  },
};

export const sizeKeys: InlineKeyboardMarkup = {
  inline_keyboard: [
    [
      Markup.button.callback('XS - 32-34', 'size_xs'),
      Markup.button.callback('S - 36-38', 'size_s'),
    ],
    [
      Markup.button.callback('M - 40-42', 'size_m'),
      Markup.button.callback('L - 44-46', 'size_l'),
    ],
    [
      Markup.button.callback('XL - 48-50', 'size_xl'),
      Markup.button.callback('XXL - 52-54', 'size_xxl'),
    ],
  ],
};

export const backToS: Record<string, InlineKeyboardMarkup> = {
  uz: {
    inline_keyboard: [
      [Markup.button.callback('🔙 Ortga qaytish', 'backToSizeForGenerous')],
    ],
  },
  ru: {
    inline_keyboard: [
      [Markup.button.callback('🔙 Назад', 'backToSizeForGenerous')],
    ],
  },
  en: {
    inline_keyboard: [
      [Markup.button.callback('🔙 Back', 'backToSizeForGenerous')],
    ],
  },
};

export const setGenerousLangKeys: InlineKeyboardMarkup = {
  inline_keyboard: [
    [Markup.button.callback("🇺🇿 O'zbekcha", 'setGenerousLangUz')],
    [Markup.button.callback('🇷🇺 Русский', 'setGenerousLangRu')],
    [Markup.button.callback('🇺🇸 English', 'setGenerousLangEn')],
  ],
};

export const backToDistrictsForGenerous: Record<string, InlineKeyboardMarkup> =
  {
    uz: {
      inline_keyboard: [
        [Markup.button.callback('🔙 Ortga qaytish', 'backToDistForGenerous')],
      ],
    },
    ru: {
      inline_keyboard: [
        [Markup.button.callback('🔙 Назад', 'backToDistForGenerous')],
      ],
    },
    en: {
      inline_keyboard: [
        [Markup.button.callback('🔙 Back', 'backToDistForGenerous')],
      ],
    },
  };

export const backToRegionsForGenerous: Record<string, InlineKeyboardMarkup> = {
  uz: {
    inline_keyboard: [
      [Markup.button.callback('🔙 Ortga qaytish', 'backToRegForGenerous')],
    ],
  },
  ru: {
    inline_keyboard: [
      [Markup.button.callback('🔙 Назад', 'backToRegForGenerous')],
    ],
  },
  en: {
    inline_keyboard: [
      [Markup.button.callback('🔙 Back', 'backToRegForGenerous')],
    ],
  },
};

export const settingsForGenerous: Record<string, InlineKeyboardMarkup> = {
  uz: {
    inline_keyboard: [
      [
        Markup.button.callback(
          `📞 Raqamni o'zgartirish`,
          'change_phone_generous',
        ),
        Markup.button.callback(`🌐 Tilni o'zgartirish`, 'change_lang_generous'),
      ],
    ],
  },
  ru: {
    inline_keyboard: [
      [
        Markup.button.callback(`📞 Изменить номер`, 'change_phone_generous'),
        Markup.button.callback(`🌐 Изменить язык`, 'change_lang_generous'),
      ],
    ],
  },
  en: {
    inline_keyboard: [
      [
        Markup.button.callback(`📞 Change phone`, 'change_phone_generous'),
        Markup.button.callback(`🌐 Change language`, 'change_lang_generous'),
      ],
    ],
  },
};

export const backToPatientsListFromRegion: Record<
  string,
  InlineKeyboardMarkup
> = {
  uz: {
    inline_keyboard: [
      [
        Markup.button.callback(
          '🔙 Ortga qaytish',
          'backToPatientsListFromRegion',
        ),
      ],
    ],
  },
  ru: {
    inline_keyboard: [
      [Markup.button.callback('🔙 Назад', 'backToPatientsListFromRegion')],
    ],
  },
  en: {
    inline_keyboard: [
      [Markup.button.callback('🔙 Back', 'backToPatientsListFromRegion')],
    ],
  },
};

export const backToPatientsListFromGenderAge: Record<
  string,
  InlineKeyboardMarkup
> = {
  uz: {
    inline_keyboard: [
      [
        Markup.button.callback(
          '🔙 Ortga qaytish',
          'backToPatientsListFromGenderAge',
        ),
      ],
    ],
  },
  ru: {
    inline_keyboard: [
      [Markup.button.callback('🔙 Назад', 'backToPatientsListFromGenderAge')],
    ],
  },
  en: {
    inline_keyboard: [
      [Markup.button.callback('🔙 Back', 'backToPatientsListFromGenderAge')],
    ],
  },
};

export const backToPatientsListFromGenderSize: Record<
  string,
  InlineKeyboardMarkup
> = {
  uz: {
    inline_keyboard: [
      [
        Markup.button.callback(
          '🔙 Ortga qaytish',
          'backToPatientsListFromGenderSize',
        ),
      ],
    ],
  },
  ru: {
    inline_keyboard: [
      [Markup.button.callback('🔙 Назад', 'backToPatientsListFromGenderSize')],
    ],
  },
  en: {
    inline_keyboard: [
      [Markup.button.callback('🔙 Back', 'backToPatientsListFromGenderSize')],
    ],
  },
};

export const backToPatientsListFromAll: Record<string, InlineKeyboardMarkup> = {
  uz: {
    inline_keyboard: [
      [Markup.button.callback('🔙 Ortga qaytish', 'backToPatientsListFromAll')],
    ],
  },
  ru: {
    inline_keyboard: [
      [Markup.button.callback('🔙 Назад', 'backToPatientsListFromAll')],
    ],
  },
  en: {
    inline_keyboard: [
      [Markup.button.callback('🔙 Back', 'backToPatientsListFromAll')],
    ],
  },
};
