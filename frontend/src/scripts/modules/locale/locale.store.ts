import { createStore } from "../../global/store";
import { getText, translate } from "./locale.utils";

export const SUPPORTED_LANGS = ["en", "de", "fr", "es"] as const;
export type LanguageOpts = (typeof SUPPORTED_LANGS)[number];

type LocaleState = { locale: Intl.Locale; lang: LanguageOpts };

const isLangSupported = (x: unknown): x is LanguageOpts => {
    return typeof x === "string" && SUPPORTED_LANGS.includes(x as LanguageOpts);
};

const initLocaleState = (): LocaleState => {
    // Check local storage for stored language preference
    const stored = localStorage.getItem(CONST.KEY.LANG);

    if (stored && isLangSupported(stored)) {
        const locale = new Intl.Locale(navigator.language);
        return { locale, lang: stored };
    }

    // Loop through browser language preference and see if any is available
    for (const tag of navigator.languages) {
        const locale = new Intl.Locale(tag);
        const lang = locale.language;
        if (isLangSupported(lang)) return { locale, lang };
    }

    // Default to English if all else fails
    return { locale: new Intl.Locale(navigator.language), lang: "en" };
};

export const localeStore = createStore<LocaleState>(initLocaleState());

// Centralized translation subscriber
localeStore.subscribe(() => {
    const { I18N_TEXT, I18N_INPUT, I18N_ALT } = CONST.ATTR;

    // Translate textContent
    translate<HTMLElement>(I18N_TEXT, (el, key) => {
        el.textContent = getText(key);
    });

    // Translate placeholders
    translate<HTMLInputElement>(I18N_INPUT, (el, key) => {
        el.placeholder = getText(key);
    });

    // Translate alt attributes
    translate<HTMLElement>(I18N_ALT, (el, key) => {
        el.setAttribute("alt", getText(key));
    });
});
