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
      [Markup.button.callback('🔙 Ortga qaytish', 'back_to_g_f_a')],
    ],
  },
  ru: {
    inline_keyboard: [[Markup.button.callback('🔙 Назад', 'back_to_g_f_a')]],
  },
  en: {
    inline_keyboard: [[Markup.button.callback('🔙 Back', 'back_to_g_f_a')]],
  },
};

export const backToGendersForSize: Record<string, InlineKeyboardMarkup> = {
  uz: {
    inline_keyboard: [
      [Markup.button.callback('🔙 Ortga qaytish', 'back_to_g_f_s')],
    ],
  },
  ru: {
    inline_keyboard: [[Markup.button.callback('🔙 Назад', 'back_to_g_f_s')]],
  },
  en: {
    inline_keyboard: [[Markup.button.callback('🔙 Back', 'back_to_g_f_s')]],
  },
};

export const backToAges: Record<string, InlineKeyboardMarkup> = {
  uz: {
    inline_keyboard: [
      [Markup.button.callback('🔙 Ortga qaytish', 'back_to_a')],
    ],
  },
  ru: {
    inline_keyboard: [[Markup.button.callback('🔙 Назад', 'back_to_a')]],
  },
  en: {
    inline_keyboard: [[Markup.button.callback('🔙 Back', 'back_to_a')]],
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
      [Markup.button.callback('🔙 Ortga qaytish', 'back_to_s')],
    ],
  },
  ru: {
    inline_keyboard: [[Markup.button.callback('🔙 Назад', 'back_to_s')]],
  },
  en: {
    inline_keyboard: [[Markup.button.callback('🔙 Back', 'back_to_s')]],
  },
};
