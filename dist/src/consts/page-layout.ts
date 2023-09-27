import { LocaleNames } from '@/i18n/ui.ts'

export const titleWithDescription = () => ({
  ru: {
    title: 'MyBid',
    description:
      'Трафик, который конвертит! CPC от $0.0002. Все ГЕО. Саппорт 24/7. Гибкие таргетинги. Прямые источники.',
  },
  en: {
    title: 'MyBid',
    description:
      'Traffic that converts! CPC from $0.002. All GEO. Fast approval. Register! Support 24/7. Flexible targeting, direct sources.',
  },
  es: {
    title: 'MyBid',
    description:
      'Traffic that converts! CPC from $0.002. All GEO. Fast approval. Register! Support 24/7. Flexible targeting, direct sources.',
  },
})

export const alternateLang = (lang: keyof typeof LocaleNames) => {
  if (lang === LocaleNames.en) return LocaleNames.es
  if (lang === LocaleNames.es) return LocaleNames.ru
  if (lang === LocaleNames.ru) return LocaleNames.en
}
