import { Injectable } from '@nestjs/common';
import { InlineKeyboardMarkup } from '@telegraf/types';
import { Markup } from 'telegraf';

@Injectable()
export class ButtonsService {
  private perPage = 5;

  private navigationLabels = {
    uz: { back: '⬅️ Orqaga', next: 'Oldinga ➡️' },
    ru: { back: '⬅️ Назад', next: 'Вперёд ➡️' },
    en: { back: '⬅️ Back', next: 'Next ➡️' },
  };

  generateButtons(
    regions: [string, string][],
    page: number,
    lang: any,
  ): InlineKeyboardMarkup {
    const start = page * this.perPage;
    const end = start + this.perPage;
    const totalPages = Math.ceil(regions.length / this.perPage);

    const buttons = regions.slice(start, end).map(([text, callback]) => {
      return [Markup.button.callback(text, callback)];
    });

    const navButtons = [];
    if (page > 0) {
      navButtons.push(
        Markup.button.callback(
          this.navigationLabels[lang].back,
          `page_${page - 1}`,
        ),
      );
    }
    if (page < totalPages - 1) {
      navButtons.push(
        Markup.button.callback(
          this.navigationLabels[lang].next,
          `page_${page + 1}`,
        ),
      );
    }

    if (navButtons.length) {
      buttons.push(navButtons);
    }

    return { inline_keyboard: buttons };
  }
}
