import { I18n } from "i18n-js";
import { en, kn } from "./supportedLanguages";
import * as Localization from "expo-localization";
import * as secureStore from "expo-secure-store";

const i18n = new I18n();

const getLang = async () => {
  return await secureStore.getItemAsync("lang");
};

i18n.enableFallback;
i18n.translations = { en, kn };
i18n.locale = "en";

export default i18n;
