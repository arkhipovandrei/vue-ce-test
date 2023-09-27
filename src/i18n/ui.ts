export const languages = {
  en: 'English',
  ru: 'Русский',
  es: 'Español',
}

export type Locales = keyof typeof languages

export enum LocaleNames {
  ru = 'ru',
  en = 'en',
  es = 'es',
}
export const defaultLang = 'en'

export const ui = {
  en: {
    'heading.slogan': 'Fully managed \nmulti-format advertising network',
    'heading.subslogan': 'We convert our traffic into your leads',

    'numbers.title': 'Highly converting traffic for any GEO',
    'numbers.description': 'strong numbers',
    'numbers.titleMobile': 'Highly converting traffic for any GEO',
    'numbers.descriptionMobile': 'strong numbers',
    'numbers.items.1.title': '+ 5 billion',
    'numbers.items.1.description': 'Impressions daily',
    'numbers.items.2.title': '+ 500.000',
    'numbers.items.2.description': 'Visits daily',
    'numbers.items.3.title': '+ 200',
    'numbers.items.3.description': 'GEOs',

    'geo.name': 'GEO',
    'geo.our': 'OUR ',
    'geo.top': 'TOP:',
    'geo.button': 'RUN CAMPAIGN',
    'geo.starts': 'CPC starts from ',

    'ad-formats.title': 'For Advertisers',
    'ad-formats.description': 'Available Ad Formats',
    'ad-formats.descriptionMobile': 'Available Ad Formats',
    'ad-formats.skip.up': 'Skip up',
    'ad-formats.skip.down': 'Skip Down',
    'ad-formats.items.01.title': 'Push Notification',
    'ad-formats.items.01.description':
      'is an ad format with a message that\'s sent to the user\'s device after he has agreed to subscribe. It\'s displayed above all other windows and has a high user loyalty to offers.',
    'ad-formats.items.02.title': 'In-Page Push',
    'ad-formats.items.02.description':
      'is an ad format that doesn\'t require permission to subscribe, allowing you to reach a huge audience. The notification appears in the top or bottom corner of the site and is displayed on all devices and browsers.',
    'ad-formats.items.03.title': 'Popunder',
    'ad-formats.items.03.description':
      'is an ad format that opens in the background tab of the browser after the user clicks on the site. The easiest and fastest way to launch an advertising campaign.',
    'ad-formats.items.04.title': 'Native',
    'ad-formats.items.04.description':
      'is an ad format that easily embeds ads into site content and is immune to Adblock. Provides user engagement and high conversion.',
    'ad-formats.items.05.title': 'Banner',
    'ad-formats.items.05.description':
      'is a classic display ad format that is placed in high traffic areas on web pages.',
    'ad-formats.items.06.title': 'Video',
    'ad-formats.items.06.description':
      'a classic version of an advertisement in the format of a video clip. Easily perceived by users and suitable for many verticals.',
    'ad-formats.loadMore': 'load more',

    'verticals.title': 'Available Verticals',
    'verticals.button': 'RUN CAMPAIGN',

    'keyFeatures.title': 'Our Key Features',
    'keyFeatures.1': 'Qualified support team 24/7',
    'keyFeatures.2': 'Fully managed platform',
    'keyFeatures.3': 'Direct traffic source',
    'keyFeatures.4': 'Free creatives from Mybid',
    'keyFeatures.5': 'Instant campaign moderation',
    'keyFeatures.6': 'Variety of advertising formats in one network',
    'keyFeatures.7': 'In-house anti-fraud',
    'keyFeatures.8': 'Competitive prices',

    'wayToStart.title': 'Easy way to start',
    'wayToStart.1': 'Provide a link to the offer',
    'wayToStart.2': 'Top up your balance',
    'wayToStart.3': 'Get profit',
    'wayToStart.button': 'RUN CAMPAIGN',

    'rtb.title': 'RTB',
    'rtb.description': 'Real-time Bidding and advantages for Advertiser',
    'rtb.1':
      'Full automation of traffic purchase and the ability to quickly scale',
    'rtb.2': 'Simultaneous connection to a huge number of traffic sources',
    'rtb.3':
      'The ability to regulate the required volume by changing the rate for traffic',
    'rtb.4': 'Fair market pricing',
    'rtb.5': 'DSP/SSP integration',
    'rtb.button': 'rtb cabinet',

    'advantages.title': 'ADVANTAGES For Publishers',
    'advantages.1': 'Popular payments methods',
    'advantages.2': 'Advanced inventory',
    'advantages.3': 'Adjustable \n ad intensity',
    'advantages.4': 'Easy \n moderation',
    'advantages.5': 'On request payments',
    'advantages.6': 'Customizable scripts',

    payments: 'Payment Methods',

    'partners.title': 'Our partners',
    'partners.button': 'become\n a partner',

    geo: 'OUR GEOS',
    'for-advertisers': 'AD FORMATS',
    verticals: 'VERTICALS',
    features: 'FEATURES',
    rtb: 'RTB',
    partners: 'PARTNERS',
    'payment-systems': 'PAYMENTS',
    'for-publishers': 'PUBLISHERS',
    blog: 'BLOG',

    signUp: 'Sign up',
    contacts: 'Contacts',
    connectWithUs: 'Connect with us',
    connectWithUsDesc: 'We are open for communication on any issues',
    followUs: 'Follow us',
    policy: 'Privacy policy',
    tems: 'Terms & Conditions',
    socials: 'Socials',
    up: 'Up',
    tags: 'Tags',
    'modal.title': 'Sign up',
    'modal.promocode': 'Promocode',
    'modal.name': 'Login',
    'modal.password': 'Password',
    'modal.login': 'Login',
    'modal.email': 'Email',
    'modal.activity': 'Activity',
    'modal.messenger': 'Messenger',
    'modal.nickname': 'Nickname',
    'modal.countryOfResidence': 'Country of residence',
    'modal.agree': ' I agree to ',
    'modal.terms': 'Terms & Conditions',
    'modal.signUpConfirm': 'start',
    name: 'Login',
    email: 'Email',
    messenger: 'Messenger',
    userName: 'Username',
    countryOfResidence: 'Country',
    promoCode: 'Promocode',
    countryPlaceholder: 'Country',
    msgrPlaceholder: 'Messenger',
    namePlaceholder: 'Enter login',
    loading: 'Loading',
    'errors.nonEmpty': 'Cannot be empty',
    'errors.invalidEmail': 'Invalid email',
    'errors.maxChars': 'Up to 30 characters',
    'errors.minChars': 'From 3 characters',
    'errors.nameValidChars': 'Allowed - word characters, digits, underline (_)',
    'errors.userNameValidChars':
      'Allowed - word characters, digits and allowed characters: -_#$%^&@.',
    'errors.emailAlreadyExist':
      'This email already exists. Check your mail, our manager will contact you',
    'errors.nameAlreadyExist':
      'This name already exists. Check your mail, our manager will contact you',
    'errors.loginAlreadyExist':
      'This login already exists. Check your mail, our manager will contact you',
    'errors.smthWentWrong': 'Something went wrong, please try again later',
  },
  es: {
    'heading.slogan':
      'Es la red de anuncios \nmultiformato totalmente administrada',
    'heading.subslogan': 'Convertimos nuestro tráfico en tus leads',

    'numbers.title': 'Tráfico de alta conversión para cualquier GEO',
    'numbers.description': 'números fuertes',
    'numbers.titleMobile': 'Highly converting traffic for any GEO',
    'numbers.descriptionMobile': 'strong numbers',
    'numbers.items.1.title': '+ 5 billones',
    'numbers.items.1.description': 'Impresiones diarias',
    'numbers.items.2.title': '+ 500.000',
    'numbers.items.2.description': 'Visitas diarias',
    'numbers.items.3.title': '+ 200',
    'numbers.items.3.description': 'GEO',

    'geo.name': 'GEO',
    'geo.our': 'NUESTRO ',
    'geo.top': 'TOP:',
    'geo.button': 'EJECUTAR CAMPAÑA',
    'geo.starts': 'CPC starts from ',

    'ad-formats.title': 'Para anunciantes',
    'ad-formats.description': 'Formatos de publicidad disponibles',
    'ad-formats.descriptionMobile': 'Available Ad Formats',
    'ad-formats.skip.up': 'Saltar hacia arriba',
    'ad-formats.skip.down': 'Saltar hacia abajo',
    'ad-formats.items.01.title': 'Notificaciónes Push',
    'ad-formats.items.01.description':
      'es un formato de anuncio con un mensaje que se envía al dispositivo del cliente después de que se haya suscrito. Se muestra por encima de todas las demás ventanas y tiene una alta lealtad de los usuarios a las ofertas.',
    'ad-formats.items.02.title': 'Imagen Push',
    'ad-formats.items.02.description':
      'es un formato de publicidad que no necesita permiso del cliente para suscribirse, lo que permite llegar a una gran audiencia. La notificación se muestra en la esquina superior o inferior del portal y se muestra en todos los dispositivos y navegadores.',
    'ad-formats.items.03.title': 'Popunder',
    'ad-formats.items.03.description':
      'es un formato de anuncio que se abre en la pestaña de fondo del navegador después de que el usuario hace clic en el sitio. La forma más facil y rápida de lanzar una campaña publicitaria.',
    'ad-formats.items.04.title': 'Nativo',
    'ad-formats.items.04.description':
      'es un formato de anuncio que agrega facilmente publicidad en el contenido de la pagina web y es inmune a Adblock. Ofrece participación del usuario y alta conversión.',
    'ad-formats.items.05.title': 'Banner',
    'ad-formats.items.05.description':
      'es un formato de publicidad gráfico clásico que se muestra en áreas de alto tráfico en las páginas web.',
    'ad-formats.items.06.title': 'Video',
    'ad-formats.items.06.description':
      'una versión clásica de publicidad en formato de videoclip. Sencillamente percibido por los usuarios y adecuado para muchos verticales.',
    'ad-formats.loadMore': 'load more',

    'verticals.title': 'Verticales disponibles',
    'verticals.button': 'EJECUTAR CAMPAÑA',

    'keyFeatures.title': 'Nuestras características clave',
    'keyFeatures.1': 'Equipo de soporte calificado 24/7',
    'keyFeatures.2': 'Plataforma completamente administrada',
    'keyFeatures.3': 'Fuente de tráfico directo',
    'keyFeatures.4': 'Creatividades gratuitas de Mybid',
    'keyFeatures.5': 'Moderación de campaña instantánea',
    'keyFeatures.6': 'Variedad de formatos de publicidad en una red',
    'keyFeatures.7': 'Antifraude interno',
    'keyFeatures.8': 'Precios competitivos',

    'wayToStart.title': 'Manera fácil de empezar',
    'wayToStart.1': 'Proporcione un enlace para la offer',
    'wayToStart.2': 'Recargue su saldo',
    'wayToStart.3': 'Recibir profit',
    'wayToStart.button': 'EJECUTAR CAMPAÑA',

    'rtb.title': 'RTB',
    'rtb.description': 'Ofertas en tiempo real y ventajas para el anunciante',
    'rtb.1':
      'Automatización total de la compra de tráfico y la capacidad de escalar de manera rápida',
    'rtb.2': 'Conexión simultánea a una amplia cantidad de fuentes de tráfico',
    'rtb.3':
      'La capacidad de regular el volumen requerido cambiando la tarifa para el tráfico',
    'rtb.4': 'Precio justo de mercado ',
    'rtb.5': 'Integración DSP/SSP',
    'rtb.button': 'rtb cabinet',

    'advantages.title': 'VENTAJAS Para Editores',
    'advantages.1': 'Metodos de pago populares',
    'advantages.2': 'Inventario avanzado',
    'advantages.3': 'Ajustable \n intensidad de publicidad',
    'advantages.4': 'Facil \n moderación',
    'advantages.5': 'Pagos a pedido',
    'advantages.6': 'Guiones personalizables',

    payments: 'Metodos de pago',

    'partners.title': 'Nuestros socios',
    'partners.button': 'convertirse \n en socio',

    geo: 'NUESTROS GEOS',
    'for-advertisers': 'FORMATOS DE PUBLICIDAD',
    verticals: 'VERTICALES',
    features: 'CARACTERISTICAS',
    rtb: 'RTB',
    partners: 'SOCIOS',
    'payment-systems': 'PAGOS',
    'for-publishers': 'PUBLISHERS',
    blog: 'BLOG',

    signUp: 'REGISTRARSE',
    contacts: 'Contacts',
    connectWithUs: 'Contáctenos',
    connectWithUsDesc:
      'Estamos abiertos a la comunicación sobre cualquier problema',
    followUs: 'Síganos',
    policy: 'Política de privacidad',
    tems: 'Términos y condiciones',
    socials: 'Socials',
    up: 'Arriba',
    tags: 'Tags',
    'modal.title': 'REGISTRARSE',
    'modal.promocode': 'Promocode',
    'modal.name': 'Nombre',
    'modal.password': 'Password',
    'modal.login': 'Acceso',
    'modal.email': 'Correo electrónico',
    'modal.activity': 'Su actividad',
    'modal.messenger': 'Messenger',
    'modal.nickname': 'Nombre de usuario',
    'modal.countryOfResidence': 'Country of residence',
    'modal.agree': ' Estoy de acuerdo con los ',
    'modal.terms': 'términos y condiciones',
    'modal.signUpConfirm': 'Iniciar',
    name: 'Nombre',
    email: 'Correo electrónico',
    messenger: 'Messenger',
    userName: 'Nombre de usuario',
    countryOfResidence: 'País',
    promoCode: 'Promocode',
    countryPlaceholder: 'País',
    msgrPlaceholder: 'Messenger',
    namePlaceholder: 'Enter name',
    loading: 'Loading',
    'errors.nonEmpty': 'Cannot be empty',
    'errors.invalidEmail': 'Invalid email',
    'errors.maxChars': 'Up to 30 characters',
    'errors.minChars': 'From 3 characters',
    'errors.nameValidChars': 'Allowed - word characters, digits, underline (_)',
    'errors.userNameValidChars':
      'Allowed - word characters, digits and allowed characters: -_#$%^&@.',
    'errors.emailAlreadyExist':
      'This email already exists. Check your mail, our manager will contact you',
    'errors.nameAlreadyExist':
      'This name already exists. Check your mail, our manager will contact you',
    'errors.loginAlreadyExist':
      'This login already exists. Check your mail, our manager will contact you',
    'errors.smthWentWrong': 'Something went wrong, please try again later',
  },
  ru: {
    'heading.slogan':
      'Мультиформатная рекламная \n сеть с fully managed управлением',
    'heading.subslogan': 'Мы конвертируем наш траффик в ваши лиды',

    'numbers.title': 'Высоконвертирующий траффик под любое ГЕО',
    'numbers.description': 'Mybid в цифрах',
    'numbers.titleMobile': 'Высоконвертирующий\n траффик под любое ГЕО',
    'numbers.descriptionMobile': 'Mybid\n в цифрах',
    'numbers.items.1.title': '+ 5 млрд',
    'numbers.items.1.description': 'показов в сутки',
    'numbers.items.2.title': '+ 500.000',
    'numbers.items.2.description': 'визитов в сутки',
    'numbers.items.3.title': '+ 200',
    'numbers.items.3.description': 'ГЕО',

    'geo.name': 'ГЕО',
    'geo.our': 'НАШ ',
    'geo.top': 'TОП:',
    'geo.button': 'НАЧАТЬ',
    'geo.starts': 'CPC от ',

    'ad-formats.title': 'Для рекламодателей',
    'ad-formats.description': 'Доступные рекламные форматы',
    'ad-formats.descriptionMobile': 'Доступные форматы',
    'ad-formats.skip.up': 'Пропустить',
    'ad-formats.skip.down': 'Пропустить',
    'ad-formats.items.01.title': 'Push Notification',
    'ad-formats.items.01.description':
      'рекламный формат с сообщением, которое отправляется на устройство пользователя после того, как он согласился подписаться. Отображается поверх всех остальных окон и имеет высокую лояльность пользователей к предложениям.',
    'ad-formats.items.02.title': 'In-Page Push',
    'ad-formats.items.02.description':
      'рекламный формат не требующий разрешения на подписку, позволяющий охватить большую аудиторию. Уведомление появляется в верхнем или нижнем углу сайта и отображается на любых устройствах и браузерах.',
    'ad-formats.items.03.title': 'Popunder',
    'ad-formats.items.03.description':
      'рекламный формат открывающийся в фоновой вкладке браузера, после того, как пользователь делает клик на сайте. Наиболее легкий и быстрый способ запустить рекламную кампанию.',
    'ad-formats.items.04.title': 'Native',
    'ad-formats.items.04.description':
      'рекламный формат, который легко встраивает рекламу в контент сайта и невосприимчив к Adblock. Обеспечивает вовлечение пользователей и высокую конверсию.',
    'ad-formats.items.05.title': 'Banner',
    'ad-formats.items.05.description':
      'классический формат дисплейной рекламы, который размещается в местах с высокой посещаемостью на веб-страницах.',
    'ad-formats.items.06.title': 'Video',
    'ad-formats.items.06.description':
      'классический вариант рекламного объявления в формате видео-ролика. Легко воспринимаются пользователями и подходит для многих вертикалей.',
    'ad-formats.loadMore': 'показать еще',

    'verticals.title': 'ДОСТУПНЫЕ ВЕРТИКАЛИ',
    'verticals.button': 'НАЧАТЬ',

    'keyFeatures.title': 'Ключевые преимущества',
    'keyFeatures.1': 'Квалифицированная команда поддержки 24/7',
    'keyFeatures.2': 'Fully managed платформа',
    'keyFeatures.3': 'Прямой источник трафика',
    'keyFeatures.4': 'Бесплатные\nкреативы от Mybid',
    'keyFeatures.5': 'Быстрая модерация кампаний',
    'keyFeatures.6': 'Разнообразие рекламных форматов в одной сети',
    'keyFeatures.7': 'In-house антифрод',
    'keyFeatures.8': 'Конкурентные цены',

    'wayToStart.title': 'несколько шагов к успеху',
    'wayToStart.1': 'Предоставь ссылку на оффер',
    'wayToStart.2': 'Пополни баланс',
    'wayToStart.3': 'Получи прибыль',
    'wayToStart.button': 'начать',

    'rtb.title': 'RTB',
    'rtb.description':
      'Торги в режиме реального времени\n и их преимущество для Рекламодателя',
    'rtb.1':
      'Полная автоматизация закупки трафика и возможность быстро масштабироваться',
    'rtb.2':
      'Одновременное подключение к большому количеству источников трафика',
    'rtb.3':
      'Возможность регулировать необходимый объем с помощью изменения ставки за трафик',
    'rtb.4': 'Честное рыночное ценообразование',
    'rtb.5': 'DSP/SSP интеграция',
    'rtb.button': 'rtb кабинет',

    'advantages.title': 'Преимущества для Паблишеров',
    'advantages.1': 'Популярные способы оплаты',
    'advantages.2': 'Расширенный функционал',
    'advantages.3': 'Управление интенсивностью рекламы',
    'advantages.4': 'Быстрая модерация',
    'advantages.5': 'Платежи\n по запросу',
    'advantages.6': 'Один скрипт\n на сайт',

    payments: 'Cпособы оплаты',

    'partners.title': 'Наши партнеры',
    'partners.button': 'стать партнером',

    geo: 'Гео',
    'for-advertisers': 'Рекламные форматы',
    verticals: 'Вертикали',
    features: 'Преимущества',
    rtb: 'rtb',
    partners: 'Партнеры',
    'payment-systems': 'Платежные системы',
    contacts: 'Контакты',
    'for-publishers': 'Паблишерам',
    blog: 'Блог',

    signUp: 'Регистрация',
    connectWithUs: 'Свяжитесь с нами',
    connectWithUsDesc: 'Мы открыты для общения по любым вопросам',
    followUs: 'Подписывайтесь на нас',
    policy: 'Privacy policy',
    tems: 'Terms & Conditions',
    socials: 'Соцсети',
    up: 'Наверх',
    tags: 'Теги',
    'modal.title': 'Регистрация',
    'modal.promocode': 'Промокод',
    'modal.name': 'Имя',
    'modal.password': 'Пароль',
    'modal.login': 'Логин',
    'modal.email': 'Email',
    'modal.activity': 'Activity',
    'modal.messenger': 'Messenger',
    'modal.nickname': 'Nickname',
    'modal.countryOfResidence': 'Страна проживания',
    'modal.agree': ' Я согласен с ',
    'modal.terms': 'условиями использования',
    'modal.signUpConfirm': 'Регистрация',
    name: 'Логин',
    email: 'Электронная почта',
    messenger: 'Мессенджер',
    userName: 'Никнейм в мессенджере',
    countryOfResidence: 'Страна проживания',
    promoCode: 'Промокод',
    countryPlaceholder: 'Страна проживания',
    msgrPlaceholder: 'Мессенджер',
    namePlaceholder: 'Введите логин',
    loading: 'Загрузка',
    'errors.nonEmpty': 'Заполните поле',
    'errors.invalidEmail': 'Неверный формат почты',
    'errors.maxChars': 'До 30 символов',
    'errors.minChars': 'От 3 символов',
    'errors.nameValidChars':
      'Допустимые символы - буквы, цифры, нижнее подчеркивание (_)',
    'errors.userNameValidChars':
      'Допустимые символы - латинскиe буквы, цифры и символы: -_#$%^&@.',
    'errors.emailAlreadyExist':
      'Введеный email уже зарегистрирован. Проверьте вашу почту',
    'errors.nameAlreadyExist': 'Пользователь с этим именем уже зарегистрирован',
    'errors.loginAlreadyExist': 'Пользователь с этим логином уже зарегистрирован',
    'errors.smthWentWrong':
      'Что-то пошло не так, попробуйте зарегистрироваться позже',
  },
} as const

export const languageKeys = Object.keys(languages)