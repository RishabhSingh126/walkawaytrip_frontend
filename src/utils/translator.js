// Google Translate programmatic translation utility

export const LANGUAGES = [
  { code: "en", name: "English", localName: "English", flag: "🇬🇧" },
  { code: "zh-CN", name: "Chinese", localName: "中文", flag: "🇨🇳" },
  { code: "hi", name: "Hindi", localName: "हिन्दी", flag: "🇮🇳" },
  { code: "es", name: "Spanish", localName: "Español", flag: "🇪🇸" },
  { code: "fr", name: "French", localName: "Français", flag: "🇫🇷" },
  { code: "pt", name: "Portuguese", localName: "Português", flag: "🇵🇹" },
  { code: "ru", name: "Russian", localName: "Русский", flag: "🇷🇺" },
  { code: "ar", name: "Arabic", localName: "العربية", flag: "🇸🇦" }
];

export const getCookieValue = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

export const getCurrentLanguage = () => {
  const val = getCookieValue("googtrans");
  if (val) {
    const parts = val.split("/");
    const code = parts[parts.length - 1];
    // Special handling for zh-CN which might show as zh-CN
    if (code.toLowerCase() === "zh-cn") return "zh-CN";
    return code;
  }
  return "en";
};

export const setLanguageCookie = (langCode) => {
  // Clear any existing cookie on root domain and host to avoid duplication
  document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + window.location.hostname + ";";
  
  if (langCode !== "en") {
    document.cookie = "googtrans=/en/" + langCode + "; path=/;";
    document.cookie = "googtrans=/en/" + langCode + "; path=/; domain=" + window.location.hostname + ";";
  }
};

export const initGoogleTranslate = () => {
  if (document.getElementById("google-translate-script")) return;

  // Add the translate element container to body
  if (!document.getElementById("google_translate_element")) {
    const div = document.createElement("div");
    div.id = "google_translate_element";
    div.style.display = "none";
    document.body.appendChild(div);
  }

  // Define the init function
  window.googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        includedLanguages: "en,zh-CN,hi,es,fr,pt,ru,ar",
        autoDisplay: false,
      },
      "google_translate_element"
    );
  };

  // Inject script
  const script = document.createElement("script");
  script.id = "google-translate-script";
  script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.async = true;
  document.body.appendChild(script);
};
