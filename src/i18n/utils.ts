import { ui, defaultLang } from './ui'

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/')
  if (lang in ui) return lang as keyof typeof ui
  return defaultLang
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang], replaces: Record<string, string | number>= {}) {
    let i18n =  ui[lang][key] || ui[defaultLang][key]

    if(!Object.keys(replaces)) {
      return i18n;
    }

    for (const replaceKey in replaces) {
      const replace = `{${replaceKey}}`;
      i18n = i18n.replace(replace, replaces[replaceKey])
    }
    return i18n
  }
}
