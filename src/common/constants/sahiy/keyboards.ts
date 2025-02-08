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
