import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { translations } from "@/shared/lib";


const resources = Object.fromEntries(
  Object.entries(translations).map(([key, value]) => [
    key,
    { translation: value },
  ])
) as Record<string, { translation: typeof translations.en }>;

i18n
  .use(initReactI18next)
  .use({
    type: "postProcessor",
    name: "emptyMissingVars",
    process: (value: string) => {
      return value.replace(/\{\{(.*?)\}\}/g, "");
    },
  })
  .init({
    resources,
    lng: localStorage.getItem("lang") || "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    postProcess: ["emptyMissingVars"],
  });
