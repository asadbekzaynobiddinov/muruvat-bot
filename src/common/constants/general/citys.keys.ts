import { InlineKeyboardMarkup } from '@telegraf/types';
import { Markup } from 'telegraf';

export const tashkentsKeys: Record<string, InlineKeyboardMarkup> = {
  uz: {
    inline_keyboard: [
      [
        Markup.button.callback('🏥 Toshkent shahar', 'tashkent_city'),
        Markup.button.callback('🏥 Toshkent viloyati', 'tashkent_region'),
      ],
    ],
  },
  ru: {
    inline_keyboard: [
      [
        Markup.button.callback('🏥 Город Ташкент', 'tashkent_city'),
        Markup.button.callback('🏥 Ташкентская область', 'tashkent_region'),
      ],
    ],
  },
  en: {
    inline_keyboard: [
      [
        Markup.button.callback('🏥 Tashkent city', 'tashkent_city'),
        Markup.button.callback('🏥 Tashkent region', 'tashkent_region'),
      ],
    ],
  },
};

export const regionKeys: Record<string, InlineKeyboardMarkup> = {
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

export const tashkentCitysKeys = {
  uz: [
    ['Bektemir tumani', 'district_bektemir'],
    ['Chilonzor tumani', 'district_chilonzor'],
    ['Mirobod tumani', 'district_mirobod'],
    ['Mirzo Ulugbek tumani', 'district_mirzo_ulugbek'],
    ['Olmozor tumani', 'district_olmazor'],
    ['Sergeli tumani', 'district_sergeli'],
    ['Shayhontohur tumani', 'district_shayhontohur'],
    ['Uchtepa tumani', 'district_uchtepa'],
    ['Yakkasaroy tumani', 'district_yakkasaroy'],
    ['Yashnaobod tumani', 'district_yashnaobod'],
    ['Yangihayot tumani', 'district_yangihayot'],
    ['Yunusobod tumani', 'district_yunusobod'],
  ],
  ru: [
    ['Бектемирский район', 'district_bektemir'],
    ['Чиланзарский район', 'district_chilonzor'],
    ['Мирободский район', 'district_mirobod'],
    ['Мирзо Улугбекский район', 'district_mirzo_ulugbek'],
    ['Олмазорский район', 'district_olmazor'],
    ['Сергелийский район', 'district_sergeli'],
    ['Шайхантахурский район', 'district_shayhontohur'],
    ['Учтепинский район', 'district_uchtepa'],
    ['Яккасарайский район', 'district_yakkasaroy'],
    ['Яшнободский район', 'district_yashnaobod'],
    ['Янгиҳайот район', 'district_yangihayot'],
    ['Юнусабадский район', 'district_yunusobod'],
  ],
  en: [
    ['Bektemir district', 'district_bektemir'],
    ['Chilonzor district', 'district_chilonzor'],
    ['Mirobod district', 'district_mirobod'],
    ['Mirzo Ulugbek district', 'district_mirzo_ulugbek'],
    ['Olmazor district', 'district_olmazor'],
    ['Sergeli district', 'district_sergeli'],
    ['Shayhontohur district', 'district_shayhontohur'],
    ['Uchtepa district', 'district_uchtepa'],
    ['Yakkasaroy district', 'district_yakkasaroy'],
    ['Yashnaobod district', 'district_yashnaobod'],
    ['Yangihayot district', 'district_yangihayot'],
    ['Yunusobod district', 'district_yunusobod'],
  ],
};

export const tashkentRegionCitysKeys = {
  uz: [
    ['Bekobod tumani', 'district_bekobod'],
    ['Boʻka tumani', 'district_boka'],
    ['Boʻstonliq tumani', 'district_bostonliq'],
    ['Chinoz tumani', 'district_chinoz'],
    ['Ohangaron tumani', 'district_ohangaron'],
    ['Oqqoʻrgʻon tumani', 'district_oqqorgon'],
    ['Oʻrta Chirchiq tumani', 'district_ortachirchiq'],
    ['Parkent tumani', 'district_parkent'],
    ['Piskent tumani', 'district_piskent'],
    ['Qibray tumani', 'district_qibray'],
    ['Quyi Chirchiq tumani', 'district_quyichirchiq'],
    ['Toshkent tumani', 'district_toshkent'],
    ['Yangiyoʻl tumani', 'district_yangoyol'],
    ['Yuqori Chirchiq tumani', 'district_yuqorichirchiq'],
    ['Zangiota tumani', 'district_zangiota'],
  ],
  ru: [
    ['Бекабадский район', 'district_bekobod'],
    ['Бука', 'district_boka'],
    ['Бостонликский район', 'district_bostonliq'],
    ['Чинозский район', 'district_chinoz'],
    ['Оҳангаронский район', 'district_ohangaron'],
    ['Оққўрғонский район', 'district_oqqorgon'],
    ['Орта Чирчиқский район', 'district_ortachirchiq'],
    ['Паркентский район', 'district_parkent'],
    ['Пискентский район', 'district_piskent'],
    ['Қибрайский район', 'district_qibray'],
    ['Қуйи Чирчиқский район', 'district_quyichirchiq'],
    ['Тошкентский район', 'district_toshkent'],
    ['Янгиёлский район', 'district_yangoyol'],
    ['Юқори Чирчиқский район', 'district_yuqorichirchiq'],
    ['Зангиотинский район', 'district_zangiota'],
  ],
  en: [
    ['Bekobod district', 'district_bekobod'],
    ['Boka', 'district_boka'],
    ['Bostonliq district', 'district_bostonliq'],
    ['Chinoz district', 'district_chinoz'],
    ['Ohangaron district', 'district_ohangaron'],
    ['Oqqorgon district', 'district_oqqorgon'],
    ['Orta Chirchiq district', 'district_ortachirchiq'],
    ['Parkent district', 'district_parkent'],
    ['Piskent district', 'district_piskent'],
    ['Qibray district', 'district_qibray'],
    ['Quyi Chirchiq district', 'district_quyichirchiq'],
    ['Toshkent district', 'district_toshkent'],
    ['Yangiyol district', 'district_yangoyol'],
    ['Yuqori Chirchiq district', 'district_yuqorichirchiq'],
    ['Zangiota district', 'district_zangiota'],
  ],
};

export const ferganaCitysKeys = {
  uz: [
    ['Bagʻdod tumani', 'district_bogdod'],
    ['Beshariq tumani', 'district_beshariq'],
    ['Buvayda tumani', 'district_buvayda'],
    ['Dangʻara tumani', 'district_dangara'],
    ['Fargʻona tumani', 'district_fergana'],
    ['Furqat tumani', 'district_furqat'],
    ['Oltiariq tumani', 'district_oltiariq'],
    ['Oyim tumani', 'district_oyim'],
    ['Oʻzbekiston tumani', 'district_ozbekiston'],
    ['Qoʻshtepa tumani', 'district_qoshtepa'],
    ['Quva tumani', 'district_quva'],
    ['Rishton tumani', 'district_rishton'],
    ['Soʻx tumani', 'district_sox'],
    ['Toshloq tumani', 'district_toshloq'],
    ['Uchkoʻprik tumani', 'district_uchkoprik'],
    ['Voroshilov tumani', 'district_voroshilov'],
    ['Yozyovon tumani', 'district_yozyovon'],
  ],
  ru: [
    ['Багдодский район', 'district_bogdod'],
    ['Бешарыкский район', 'district_beshariq'],
    ['Бувайдо', 'district_buvayda'],
    ['Дангаринский район', 'district_dangara'],
    ['Ферганский район', 'district_fergana'],
    ['Фуркатский район', 'district_furqat'],
    ['Олтарикский район', 'district_oltiariq'],
    ['Ойим', 'district_oyim'],
    ['Узбекистанский район', 'district_ozbekiston'],
    ['Қўштепа', 'district_qoshtepa'],
    ['Қува', 'district_quva'],
    ['Риштонский район', 'district_rishton'],
    ['Сох', 'district_sox'],
    ['Тошлок', 'district_toshloq'],
    ['Учкўприк', 'district_uchkoprik'],
    ['Ворошиловский район', 'district_voroshilov'],
    ['Ёзёвон', 'district_yozyovon'],
  ],
  en: [
    ['Bagdod district', 'district_bogdod'],
    ['Beshariq district', 'district_beshariq'],
    ['Buvayda', 'district_buvayda'],
    ['Dangara district', 'district_dangara'],
    ['Fergana district', 'district_fergana'],
    ['Furqat district', 'district_furqat'],
    ['Oltiariq district', 'district_oltiariq'],
    ['Oyim', 'district_oyim'],
    ['Ozbekiston district', 'district_ozbekiston'],
    ['Qoshtepa', 'district_qoshtepa'],
    ['Quva', 'district_quva'],
    ['Rishton district', 'district_rishton'],
    ['Sox', 'district_sox'],
    ['Toshloq', 'district_toshloq'],
    ['Uchkoprik', 'district_uchkoprik'],
    ['Voroshilov district', 'district_voroshilov'],
    ['Yozyovon', 'district_yozyovon'],
  ],
};

export const samarkandCityKeys = {
  uz: [
    ['Samarqand tumani', 'district_samarqand'],
    ['Ishtixon tumani', 'district_ishtixon'],
    ['Jomboy tumani', 'district_jomboy'],
    ['Urgut tumani', 'district_urgut'],
    ['Kattakurgan tumani', 'district_kattakurgan'],
    ['Pastdargom tumani', 'district_pastdargom'],
    ['Narpay tumani', 'district_narpay'],
    ['Payariq tumani', 'district_payariq'],
    ['Bulungur tumani', 'district_bulungur'],
    ['Oqdaryo tumani', 'district_oqdaryo'],
    ['Toyloq tumani', 'district_toyloq'],
    ['Qo‘shrabot tumani', 'district_qoshrabot'],
    ['Nurobod tumani', 'district_nurobod'],
    ['Paxtachi tumani', 'district_paxtachi'],
    ['Oqdaryo tumani', 'district_oqdaryo_tumani'],
  ],
  ru: [
    ['Самарканд округ', 'district_samarqand'],
    ['Иштыхан округ', 'district_ishtixon'],
    ['Джамбай округ', 'district_jomboy'],
    ['Ургут округ', 'district_urgut'],
    ['Каттакурган округ', 'district_kattakurgan'],
    ['Пастдаргом округ', 'district_pastdargom'],
    ['Нарпай округ', 'district_narpay'],
    ['Паярик округ', 'district_payariq'],
    ['Булунгур округ', 'district_bulungur'],
    ['Акдарья округ', 'district_oqdaryo'],
    ['Тойлак округ', 'district_toyloq'],
    ['Кушработ округ', 'district_qoshrabot'],
    ['Нурабад округ', 'district_nurobod'],
    ['Пахтачи округ', 'district_paxtachi'],
    ['Акдарья округ', 'district_oqdaryo_tumani'],
  ],
  en: [
    ['Samarkand district', 'district_samarqand'],
    ['Ishtixon district', 'district_ishtixon'],
    ['Jomboy district', 'district_jomboy'],
    ['Urgut district', 'district_urgut'],
    ['Kattakurgan district', 'district_kattakurgan'],
    ['Pastdargom district', 'district_pastdargom'],
    ['Narpay district', 'district_narpay'],
    ['Payariq district', 'district_payariq'],
    ['Bulungur district', 'district_bulungur'],
    ['Oqdaryo district', 'district_oqdaryo'],
    ['Toyloq district', 'district_toyloq'],
    ['Qo‘shrabot district', 'district_qoshrabot'],
    ['Nurobod district', 'district_nurobod'],
    ['Paxtachi district', 'district_paxtachi'],
    ['Oqdaryo district', 'district_oqdaryo_tumani'],
  ],
};

export const bukharaCityKeys = {
  uz: [
    ['Buxoro tumani', 'district_bukhara'],
    ['G‘ijduvon tumani', 'district_gijduvon'],
    ['Kogon tumani', 'district_kogon'],
    ['Olot tumani', 'district_olot'],
    ['Jondor tumani', 'district_jondor'],
    ['Kogon tumani', 'district_kogon'],
    ['Peshku tumani', 'district_peshku'],
    ['Qorako‘l tumani', 'district_qorakol'],
    ['Qorovulbozor tumani', 'district_qorovulbozor'],
    ['Romitan tumani', 'district_romitan'],
    ['Shofirkon tumani', 'district_shofirkon'],
    ['Vobkent tumani', 'district_vobkent'],
  ],
  ru: [
    ['Бухара округ', 'district_bukhara'],
    ['Гиждуван округ', 'district_gijduvon'],
    ['Когон округ', 'district_kogon'],
    ['Олот округ', 'district_olot'],
    ['Джондор округ', 'district_jondor'],
    ['Когон округ', 'district_kogon'],
    ['Пешку округ', 'district_peshku'],
    ['Каракуль округ', 'district_qorakol'],
    ['Караулбазар округ', 'district_qorovulbozor'],
    ['Ромитан округ', 'district_romitan'],
    ['Шофиркон округ', 'district_shofirkon'],
    ['Вабкент округ', 'district_vobkent'],
  ],
  en: [
    ['Bukhara district', 'district_bukhara'],
    ['Gijduvon district', 'district_gijduvon'],
    ['Kogon district', 'district_kogon'],
    ['Olot district', 'district_olot'],
    ['Jondor district', 'district_jondor'],
    ['Kogon district', 'district_kogon'],
    ['Peshku district', 'district_peshku'],
    ['Qorakol district', 'district_qorakol'],
    ['Qorovulbozor district', 'district_qorovulbozor'],
    ['Romitan district', 'district_romitan'],
    ['Shofirkon district', 'district_shofirkon'],
    ['Vobkent district', 'district_vobkent'],
  ],
};

export const namanganCityKeys = {
  uz: [
    ['Chortoq tumani', 'district_chortoq'],
    ['Chust tumani', 'district_chust'],
    ['Kosonsoy tumani', 'district_kosonsoy'],
    ['Mingbuloq tumani', 'district_mingbuloq'],
    ['Namangan tumani', 'district_namangan'],
    [' Norin tumani', 'district_norin'],
    ['Pop tumani', 'district_pop'],
    ['Toʻraqoʻrgʻon tumani', 'district_toraqorgon'],
    ['Uchqoʻrgʻon tumani', 'district_uchqorgon'],
    ['Uychi tumani', 'district_uychi'],
    ['Yangiqoʻrgʻon tumani', 'district_yangiqorgon'],
    ['Yangi Namangan tumani', 'district_yanginamangan'],
  ],
  ru: [
    ['Чартакский район', 'district_chortoq'],
    ['Чустский район', 'district_chust'],
    ['Косонсойский район', 'district_kosonsoy'],
    ['Мингбулакский район', 'district_mingbuloq'],
    ['Наманганский район', 'district_namangan'],
    ['Нарынский район', 'district_norin'],
    ['Попский район', 'district_pop'],
    ['Туракурганский район', 'district_toraqorgon'],
    ['Учкурганский район', 'district_uchqorgon'],
    ['Уйчинский район', 'district_uychi'],
    ['Янгикурганский район', 'district_yangiqorgon'],
    ['Янги Наманганский район', 'district_yanginamangan'],
  ],
  en: [
    ['Chortoq district', 'district_chortoq'],
    ['Chust district', 'district_chust'],
    ['Kosonsoy district', 'district_kosonsoy'],
    ['Mingbuloq district', 'district_mingbuloq'],
    ['Namangan district', 'district_namangan'],
    ['Norin district', 'district_norin'],
    ['Pop district', 'district_pop'],
    ['Toraqorgon district', 'district_toraqorgon'],
    ['Uchqorgon district', 'district_uchqorgon'],
    ['Uychi district', 'district_uychi'],
    ['Yangiqorgon district', 'district_yangiqorgon'],
    ['Yangi Namangan district', 'district_yanginamangan'],
  ],
};

export const andijanCityKeys = {
  uz: [
    ['Andijon tumani', 'district_andijon'],
    ['Asaka tumani', 'district_asaka'],
    ['Baliqchi tumani', 'district_baliqchi'],
    ["Bo'ston tumani", 'district_boz'],
    ['Buloqboshi tumani', 'district_buloqboshi'],
    ['Izboskan tumani', 'district_izboskan'],
    ['Jalaquduq tumani', 'district_jalaquduq'],
    ['Xo‘jaobod tumani', 'district_xojaobod'],
    ['Qo‘rg‘ontepa tumani', 'district_qorgontepa'],
    ['Marhamat tumani', 'district_marhamat'],
    ['Oltinko‘l tumani', 'district_oltinkol'],
    ['Paxtaobod tumani', 'district_paxtaobod'],
    ['Shahrixon tumani', 'district_shahrixon'],
    ['Ulug‘nor tumani', 'district_ulugnor'],
  ],
  ru: [
    ['Андижанский район', 'district_andijon'],
    ['Асакинский район', 'district_asaka'],
    ['Балыкчинский район', 'district_baliqchi'],
    ['Бостонский район', 'district_boz'],
    ['Булокбошинский район', 'district_buloqboshi'],
    ['Избосканский район', 'district_izboskan'],
    ['Джалакудукский район', 'district_jalaquduq'],
    ['Мархаматский район', 'district_marhamat'],
    ['Алтынкульский район', 'district_oltinkol'],
    ['Пахтаабадский район', 'district_paxtaobod'],
    ['Кургантепинский район', 'district_qorgontepa'],
    ['Шахриханский район', 'district_shahrixon'],
    ['Улугнорский район', 'district_ulugnor'],
    ['Ходжаабад район', 'district_xojaobod'],
  ],
  en: [
    ['Andijan district', 'district_andijon'],
    ['Asaka district', 'district_asaka'],
    ['Baliqchi district', 'district_baliqchi'],
    ['Boston district', 'district_boz'],
    ['Buloqboshi district', 'district_buloqboshi'],
    ['Izboskan district', 'district_izboskan'],
    ['Jalaquduq district', 'district_jalaquduq'],
    ['Marhamat district', 'district_marhamat'],
    ['Oltinko‘l district', 'district_oltinkol'],
    ['Paxtaobod district', 'district_paxtaobod'],
    ['Qo‘rg‘ontepa district', 'district_qorgontepa'],
    ['Shahrixon district', 'district_shahrixon'],
    ['Ulug‘nor district', 'district_ulugnor'],
    ['Xo‘jaobod district', 'district_xojaobod'],
  ],
};

export const qashqadaryaCityKeys = {
  uz: [
    ['Bahoriston tumani', 'district_bahoriston'],
    ['Chiroqchi tumani', 'district_chiroqchi'],
    ['Dehqonobod tumani', 'district_dehqonobod'],
    ['Gʻuzor tumani', 'district_guzor'],
    ['Kasbi tumani', 'district_kasbi'],
    ['Kitob tumani', 'district_kitob'],
    ['Koson tumani', 'district_koson'],
    ['Koʻkdala tumani', 'district_kokdala'],
    ['Mirishkor tumani', 'district_mirishkor'],
    ['Muborak tumani', 'district_muborak'],
    ['Nishon tumani', 'district_nishon'],
    ['Qamashi tumani', 'district_qamashi'],
    ['Qarshi tumani', 'district_qarshi'],
    ['Shahrisabz tumani', 'district_shahrisabz'],
    ['Yakkabogʻ tumani', 'district_yakkabog'],
  ],
  ru: [
    ['Бахористонский район', 'district_bahoriston'],
    ['Чиракчинский район', 'district_chiroqchi'],
    ['Дехканабадский район', 'district_dehqonobod'],
    ['Гузарский район', 'district_guzor'],
    ['Касбинский район', 'district_kasbi'],
    ['Китабский район', 'district_kitob'],
    ['Касанский район', 'district_koson'],
    ['Кукдалинский район', 'district_kokdala'],
    ['Миришкорский район', 'district_mirishkor'],
    ['Мубарекский район', 'district_muborak'],
    ['Нишанский район', 'district_nishon'],
    ['Камашинский район', 'district_qamashi'],
    ['Каршинский район', 'district_qarshi'],
    ['Шахрисабзский район', 'district_shahrisabz'],
    ['Яккабогский район', 'district_yakkabog'],
  ],
  en: [
    ['Bahoriston district', 'district_bahoriston'],
    ['Chiroqchi district', 'district_chiroqchi'],
    ['Dehqonobod district', 'district_dehqonobod'],
    ['Guzor district', 'district_guzor'],
    ['Kasbi district', 'district_kasbi'],
    ['Kitob district', 'district_kitob'],
    ['Koson district', 'district_koson'],
    ['Kokdala district', 'district_kokdala'],
    ['Mirishkor district', 'district_mirishkor'],
    ['Muborak district', 'district_muborak'],
    ['Nishon district', 'district_nishon'],
    ['Qamashi district', 'district_qamashi'],
    ['Qarshi district', 'district_qarshi'],
    ['Shahrisabz district', 'district_shahrisabz'],
    ['Yakkabog district', 'district_yakkabog'],
  ],
};

export const jizzaxCityKeys = {
  uz: [
    ['Jizzax tumani', 'district_jizzax'],
    ['Arnasoy tumani', 'district_arnasoy'],
    ['Baxmal tumani', 'district_baxmal'],
    ['Do‘stlik tumani', 'district_dostlik'],
    ['Forish tumani', 'district_forish'],
    ['G‘allaorol tumani', 'district_gallaorol'],
    ['Sharof Rashidov tumani', 'district_sharof_rashidov'],
    ['Mirzacho‘l tumani', 'district_mirzachol'],
    ['Paxtakor tumani', 'district_paxtakor'],
    ['Yangiobod tumani', 'district_yangiobod'],
    ['Zafarobod tumani', 'district_zafarobod'],
    ['Zarbdor tumani', 'district_zarbdor'],
  ],
  ru: [
    ['Джизакский район', 'district_jizzax'],
    ['Арнасайский район', 'district_arnasoy'],
    ['Бахмальский район', 'district_baxmal'],
    ['Дустликский район', 'district_dostlik'],
    ['Фаришский район', 'district_forish'],
    ['Галлааральский район', 'district_gallaorol'],
    ['Шароф Рашидов район', 'district_sharof_rashidov'],
    ['Мирзачульский район', 'district_mirzachol'],
    ['Пахтакорский район', 'district_paxtakor'],
    ['Янгиабадский район', 'district_yangiobod'],
    ['Зафарабадский район', 'district_zafarobod'],
    ['Зарбдорский район', 'district_zarbdor'],
  ],
  en: [
    ['Jizzax district', 'district_jizzax'],
    ['Arnasoy district', 'district_arnasoy'],
    ['Baxmal district', 'district_baxmal'],
    ['Dostlik district', 'district_dostlik'],
    ['Forish district', 'district_forish'],
    ['Gallaorol district', 'district_gallaorol'],
    ['Sharof Rashidov district', 'district_sharof_rashidov'],
    ['Mirzachol district', 'district_mirzachol'],
    ['Paxtakor district', 'district_paxtakor'],
    ['Yangiobod district', 'district_yangiobod'],
    ['Zafarobod district', 'district_zafarobod'],
    ['Zarbdor district', 'district_zarbdor'],
  ],
};

export const sirdaryoCityKeys = {
  uz: [
    ['Sirdaryo tumani', 'district_sirdaryo'],
    ['Boyovut tumani', 'district_boyovut'],
    ['Guliston tumani', 'district_guliston'],
    ['Mirzaobod tumani', 'district_mirzaobod'],
    ['Oqoltin tumani', 'district_oqoltin'],
    ['Sayxunobod tumani', 'district_sayxunobod'],
    ['Sardoba tumani', 'district_sardoba'],
    ['Xovos tumani', 'district_xovos'],
    ['Yangiyer tumani', 'district_yangiyer'],
  ],
  ru: [
    ['Сырдарьинский район', 'district_sirdaryo'],
    ['Баяутский район', 'district_boyovut'],
    ['Гулистанский район', 'district_guliston'],
    ['Мирзаабадский район', 'district_mirzaobod'],
    ['Акалтынский район', 'district_oqoltin'],
    ['Сайхунабадский район', 'district_sayxunobod'],
    ['Сардобинский район', 'district_sardoba'],
    ['Хавасский район', 'district_xovos'],
    ['Янгиерский район', 'district_yangiyer'],
  ],
  en: [
    ['Sirdaryo district', 'district_sirdaryo'],
    ['Boyovut district', 'district_boyovut'],
    ['Guliston district', 'district_guliston'],
    ['Mirzaobod district', 'district_mirzaobod'],
    ['Oqoltin district', 'district_oqoltin'],
    ['Sayxunobod district', 'district_sayxunobod'],
    ['Sardoba district', 'district_sardoba'],
    ['Xovos district', 'district_xovos'],
    ['Yangiyer district', 'district_yangiyer'],
  ],
};

export const xorazmCityKeys = {
  uz: [
    ['Urganch tumani', 'district_urganch'],
    ['Bogʻot tumani', 'district_bogot'],
    ['Gurlan tumani', 'district_gurlan'],
    ['Xiva tumani', 'district_xiva'],
    ['Xonqa tumani', 'district_xonqa'],
    ['Hazorasp tumani', 'district_hazorasp'],
    ['Shovot tumani', 'district_shovot'],
    ['Yangiariq tumani', 'district_yangiariq'],
    ['Yangibozor tumani', 'district_yangibozor'],
    ['Qoʻshkoʻpir tumani', 'district_qoshkoprik'],
    ['Tuproqqalʼa tumani', 'district_tuproqqala'],
  ],
  ru: [
    ['Ургенчский район', 'district_urganch'],
    ['Багатский район', 'district_bogot'],
    ['Гурланский район', 'district_gurlan'],
    ['Хивинский район', 'district_xiva'],
    ['Ханкинский район', 'district_xonqa'],
    ['Хазараспский район', 'district_hazorasp'],
    ['Шаватский район', 'district_shovot'],
    ['Янгиарикский район', 'district_yangiariq'],
    ['Янгибазарский район', 'district_yangibozor'],
    ['Кошкупырский район', 'district_qoshkoprik'],
    ['Тупраккалинский район', 'district_tuproqqala'],
  ],
  en: [
    ['Urganch district', 'district_urganch'],
    ['Bogot district', 'district_bogot'],
    ['Gurlan district', 'district_gurlan'],
    ['Xiva district', 'district_xiva'],
    ['Xonqa district', 'district_xonqa'],
    ['Hazorasp district', 'district_hazorasp'],
    ['Shovot district', 'district_shovot'],
    ['Yangiariq district', 'district_yangiariq'],
    ['Yangibozor district', 'district_yangibozor'],
    ['Qoshkoprik district', 'district_qoshkoprik'],
    ['Tuproqqala district', 'district_tuproqqala'],
  ],
};

export const surxandaryaCityKeys = {
  uz: [
    ['Angor tumani', 'district_angor'],
    ['Bandixon tumani', 'district_bandixon'],
    ['Boysun tumani', 'district_boysun'],
    ['Denov tumani', 'district_denov'],
    ['Jarqoʻrgʻon tumani', 'district_jarqorgon'],
    ['Qiziriq tumani', 'district_qiziriq'],
    ['Qumqoʻrgʻon tumani', 'district_qumqoron'],
    ['Muzrabod tumani', 'district_muzrabod'],
    ['Oltinsoy tumani', 'district_oltinsoy'],
    ['Sariosiyo tumani', 'district_sariosiyo'],
    ['Sherobod tumani', 'district_sherobod'],
    ['Shoʻrchi tumani', 'district_shorchi'],
    ['Termiz tumani', 'district_termiz'],
    ['Uzun tumani', 'district_uzun'],
  ],
  ru: [
    ['Ангорский район', 'district_angor'],
    ['Бандиханский район', 'district_bandixon'],
    ['Байсунский район', 'district_boysun'],
    ['Денауский район', 'district_denov'],
    ['Джаркурганский район', 'district_jarqorgon'],
    ['Кызырыкский район', 'district_qiziriq'],
    ['Кумкурганский район', 'district_qumqoron'],
    ['Музрабадский район', 'district_muzrabod'],
    ['Алтынсайский район', 'district_oltinsoy'],
    ['Сариасийский район', 'district_sariosiyo'],
    ['Шерабадский район', 'district_sherobod'],
    ['Шурчинский район', 'district_shorchi'],
    ['Термезский район', 'district_termiz'],
    ['Узунский район', 'district_uzun'],
  ],
  en: [
    ['Angor District', 'district_angor'],
    ['Bandixon District', 'district_bandixon'],
    ['Boysun District', 'district_boysun'],
    ['Denov District', 'district_denov'],
    ['Jarqoʻrgʻon District', 'district_jarqorgon'],
    ['Qiziriq District', 'district_qiziriq'],
    ['Qumqoʻrgʻon District', 'district_qumqoron'],
    ['Muzrabod District', 'district_muzrabod'],
    ['Oltinsoy District', 'district_oltinsoy'],
    ['Sariosiyo District', 'district_sariosiyo'],
    ['Sherobod District', 'district_sherobod'],
    ['Shoʻrchi District', 'district_shorchi'],
    ['Termiz District', 'district_termiz'],
    ['Uzun District', 'district_uzun'],
  ],
};

export const karakalpakstanCityKeys = {
  uz: [
    ['Amudaryo tumani', 'district_amudaryo'],
    ['Beruniy tumani', 'district_beruniy'],
    ['Chimboy tumani', 'district_chimboy'],
    ['Ellikqala tumani', 'district_ellikqala'],
    ['Kegeyli tumani', 'district_kegeyli'],
    ['Moʻynoq tumani', 'district_moynoq'],
    ['Nukus tumani', 'district_nukus'],
    ['Qanlikoʻl tumani', 'district_qanlikol'],
    ['Qoʻngʻirot tumani', 'district_qongirot'],
    ['Qoraoʻzak tumani', 'district_qoraozak'],
    ['Shumanay tumani', 'district_shumanay'],
    ['Taxtakoʻpir tumani', 'district_taxtakopir'],
    ['Toʻrtkoʻl tumani', 'district_tortkol'],
    ['Xoʻjayli tumani', 'district_xojayli'],
  ],
  ru: [
    ['Амударьинский район', 'district_amudaryo'],
    ['Беруниский район', 'district_beruniy'],
    ['Чимбайский район', 'district_chimboy'],
    ['Элликкалинский район', 'district_ellikqala'],
    ['Кегейлийский район', 'district_kegeyli'],
    ['Муйнакский район', 'district_moynoq'],
    ['Нукусский район', 'district_nukus'],
    ['Канлыкульский район', 'district_qanlikol'],
    ['Кунградский район', 'district_qongirot'],
    ['Караузякский район', 'district_qoraozak'],
    ['Шуманайский район', 'district_shumanay'],
    ['Тахтакупырский район', 'district_taxtakopir'],
    ['Турткульский район', 'district_tortkol'],
    ['Ходжейлийский район', 'district_xojayli'],
  ],
  en: [
    ['Amudaryo District', 'district_amudaryo'],
    ['Beruniy District', 'district_beruniy'],
    ['Chimboy District', 'district_chimboy'],
    ['Ellikqala District', 'district_ellikqala'],
    ['Kegeyli District', 'district_kegeyli'],
    ['Moʻynoq District', 'district_moynoq'],
    ['Nukus District', 'district_nukus'],
    ['Qanlikoʻl District', 'district_qanlikol'],
    ['Qoʻngʻirot District', 'district_qongirot'],
    ['Qoraoʻzak District', 'district_qoraozak'],
    ['Shumanay District', 'district_shumanay'],
    ['Taxtakoʻpir District', 'district_taxtakopir'],
    ['Toʻrtkoʻl District', 'district_tortkol'],
    ['Xoʻjayli District', 'district_xojayli'],
  ],
};

export const navoiCityKeys = {
  uz: [
    ['Konimex tumani', 'district_konimex'],
    ['Karmana tumani', 'district_karmana'],
    ['Qiziltepa tumani', 'district_qiziltepa'],
    ['Xatirchi tumani', 'district_xatirchi'],
    ['Navbahor tumani', 'district_navbahor'],
    ['Nurota tumani', 'district_nurota'],
    ['Tomdi tumani', 'district_tomdi'],
    ['Uchquduq tumani', 'district_uchquduq'],
  ],
  ru: [
    ['Конимехский район', 'district_konimex'],
    ['Карманинский район', 'district_karmana'],
    ['Кызылтепинский район', 'district_qiziltepa'],
    ['Хатырчинский район', 'district_xatirchi'],
    ['Навбахорский район', 'district_navbahor'],
    ['Нуротинский район', 'district_nurota'],
    ['Томдинский район', 'district_tomdi'],
    ['Учкудукский район', 'district_uchquduq'],
  ],
  en: [
    ['Konimex district', 'district_konimex'],
    ['Karmana district', 'district_karmana'],
    ['Qiziltepa district', 'district_qiziltepa'],
    ['Xatirchi district', 'district_xatirchi'],
    ['Navbahor district', 'district_navbahor'],
    ['Nurota district', 'district_nurota'],
    ['Tomdi district', 'district_tomdi'],
    ['Uchquduq district', 'district_uchquduq'],
  ],
};
