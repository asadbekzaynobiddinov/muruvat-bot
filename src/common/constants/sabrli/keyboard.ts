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
