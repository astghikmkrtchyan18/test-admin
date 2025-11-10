import en from "./en.json";
import ru from "./ru.json";
import hy from "./hy.json";

export const translations = { en, hy, ru } as const;

export const Languages: { value: string; icon: string; name: string }[] = [
  { value: "en", icon: "🇬🇧", name: "English" },
  { value: "hy", icon: "🇦🇲", name: "Հայերեն" },
  { value: "ru", icon: "🇷🇺", name: "Русский" },
];
