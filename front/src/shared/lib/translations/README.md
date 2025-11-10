
# 🌐 Translations Library

This module manages the localization (i18n) resources used throughout the React application.  
It stores all language JSON files and exports them as a unified `translations` object and a `Languages` array for UI display.

---

## 📁 Folder Structure

src/shared/lib/translations/  
│  
├── en.json # English translations  
├── ru.json # Russian translations  
├── hy.json # Armenian translations  
├── index.ts # Main export file for all translations  
└── README.md # (this file)

---

## ⚙️ How It Works

The `index.ts` file imports language JSON files and registers them inside two main objects:

### 1. `translations`

Holds all translation resources:

```ts
export const translations = { en, hy, ru } as const;
```

### 2. `Languages`

Defines available languages with metadata used for language selectors:

```ts
export const Languages = [
  { value: "en", icon: "🇬🇧", name: "English" },
  { value: "hy", icon: "🇦🇲", name: "Հայերեն" },
  { value: "ru", icon: "🇷🇺", name: "Русский" },
];
```

### ➕ How to Add a New Language

Follow these steps whenever you need to add a new translation:

1. **Create a new JSON file**
    

Inside this folder (translations/), create a new file named with the language code, for example:

`fr.json`

Example content:

```json
{
  "HomePage": {
    "title": "Créer une application React",
    "description": "Commencez à coder en modifiant ce fichier."
  }
}
```

2. **Import it in `index.ts`**
    

```ts
import fr from "./fr.json";
```

3. **Add it to the `translations` object**
    

```ts
export const translations = { en, hy, ru, fr } as const;
```

4. **Add it to the `Languages` array**
    

```ts
export const Languages = [
  { value: "en", icon: "🇬🇧", name: "English" },
  { value: "hy", icon: "🇦🇲", name: "Հայերեն" },
  { value: "ru", icon: "🇷🇺", name: "Русский" },
  { value: "fr", icon: "🇫🇷", name: "Français" }
];
```

⚠️ IMPORTANT — Keep JSON structure identical!

When adding a new language file, you must copy all keys and structure from an existing JSON (for example, from `en.json`) to ensure consistency across languages.

✅ Example of correct structure:

```json
{
  "hello": "Hello",
  "welcome": "Welcome to our site",
  "language": "Language",
  "map": {
    "openGoogle": "Open in Google Maps",
    "openYandex": "Open in Yandex Maps"
  }
}
```

In this example, `map` is the page name or section.

Every language JSON must have the same structure:

```json
{
  "hello": "...",
  "welcome": "...",
  "language": "...",
  "map": {
    "openGoogle": "...",
    "openYandex": "..."
  }
}
```

❌ Do NOT remove or rename keys between languages — otherwise your app might show missing translations.

5. **Done ✅**
    

Now the new language:

- Appears in your language selector
    
- Loads automatically via your i18n configuration
    

### 🧩 Tips

- Keep translation keys consistent across all language JSONs.
    
- Use ISO 639-1 codes (e.g., en, fr, de, es) for file names and value.
    
- Validate JSON syntax before committing (`npm run lint` or use VS Code formatting).
    

Example After Adding French 🇫🇷

```ts
import en from "./en.json";
import ru from "./ru.json";
import hy from "./hy.json";
import fr from "./fr.json";

export const translations = { en, hy, ru, fr } as const;

export const Languages = [
  { value: "en", icon: "🇬🇧", name: "English" },
  { value: "hy", icon: "🇦🇲", name: "Հայերեն" },
  { value: "ru", icon: "🇷🇺", name: "Русский" },
  { value: "fr", icon: "🇫🇷", name: "Français" },
];
```

### 🧠 Purpose

This structure ensures:

- Easy scaling of supported languages
    
- Centralized translation management
    
- Type-safe integration with i18n
    

**Author:**  JK 
**Updated:** 2025-10-23