import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from '~/locales/en.json'

const resources = {
  en: {
    translation: en
  }
}

i18n.use(LanguageDetector).init({
  resources,
  fallbackLng: 'en',
  debug: process.env.NODE_ENV === 'development' ? true : false,

  interpolation: {
    escapeValue: false
  },

  react: {
    wait: true
  }
})

export default i18n
