import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// import Backend from 'i18next-http-backend';   // [1]
import LanguageDetector from 'i18next-browser-languagedetector';
// don't want to use this?
// have a look at the Quick start guide 
// for passing in lng and translations on init

// Keeping translation files in the src. 
// When using backend to fetch translation files in pulic/locales, test will fail since it can't make HTTP requests.
import * as en from '../data/en/translation.json'
import * as de from '../data/de/translation.json'
import * as fr from '../data/fr/translation.json'

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
  // .use(Backend)   // [1]

  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)

  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    // Adding   load: 'languageOnly'  fixed the issue of i18next causing http error not found when deploying. 
    // Checkout: https://github.com/i18next/i18next-http-backend#troubleshooting
    load: 'languageOnly',
    fallbackLng: 'en',
    debug: true,
    whitelist: ['de', 'en', 'fr'],
    detection: {
        order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
        cache: ['cookie']
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: en
      },
      fr: {
        translation: fr
      },
      de: {
        translation: de
      }
    }
  });
export default i18n;


// [1] Uncomment if you want to fetch translation.json files in puclic/locales using HTTP request