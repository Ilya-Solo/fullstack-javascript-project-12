import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resources from "./index";

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "en",
  debug: true,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
