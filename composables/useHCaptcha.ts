export const useHCaptcha = () => {
  // Get hCaptcha site key from Nuxt runtime config
  const config = useRuntimeConfig();
  const HCAPTCHA_SITE_KEY =
    config.public.hCaptchaSiteKey || "20000000-ffff-ffff-ffff-000000000002"; // Demo site key for development
  const captchaToken = ref<string | null>(null);
  const captchaError = ref<string | null>(null);
  const isCaptchaLoaded = ref(false);
  const captchaWidget = ref<string | null>(null);

  // Get user's language from browser
  const getUserLanguage = (): string => {
    if (typeof window === "undefined") return "en";

    // Use browser language
    const browserLang =
      navigator.language ||
      (navigator.languages && navigator.languages[0]) ||
      "en";
    // Extract just the language code (e.g., "fr" from "fr-FR")
    return browserLang.split("-")[0];
  };

  // Load hCaptcha script with language parameter
  const loadHCaptcha = () => {
    if (
      typeof window !== "undefined" &&
      !document.querySelector("#hcaptcha-script")
    ) {
      const lang = getUserLanguage();
      const script = document.createElement("script");
      script.id = "hcaptcha-script";
      // Add hl parameter for language localization
      script.src = `https://js.hcaptcha.com/1/api.js?onload=onLoadHCaptchaCallback&render=explicit&hl=${lang}`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        isCaptchaLoaded.value = true;
      };
      document.head.appendChild(script);

      // Set global callback
      // @ts-ignore
      window.onLoadHCaptchaCallback = () => {
        isCaptchaLoaded.value = true;
      };
    } else if (document.querySelector("#hcaptcha-script")) {
      isCaptchaLoaded.value = true;
    }
  };

  // Initialize captcha widget
  const initCaptcha = (containerId: string) => {
    if (isCaptchaLoaded.value && typeof window !== "undefined") {
      try {
        // @ts-ignore
        if (window.hcaptcha && !captchaWidget.value) {
          // @ts-ignore
          captchaWidget.value = window.hcaptcha.render(containerId, {
            sitekey: HCAPTCHA_SITE_KEY,
            hl: getUserLanguage(), // Add language parameter for localization
            callback: (token: string) => {
              onCaptchaVerified(token);
            },
            "expired-callback": () => {
              onCaptchaExpired();
            },
            "error-callback": () => {
              onCaptchaError();
            },
          });
          return captchaWidget.value;
        }
      } catch (error) {
        console.error("Error initializing hCaptcha:", error);
      }
    }
    return captchaWidget.value;
  };

  // Reset captcha
  const resetCaptcha = () => {
    captchaToken.value = null;
    captchaError.value = null;
    if (captchaWidget.value && typeof window !== "undefined") {
      try {
        // @ts-ignore
        if (window.hcaptcha) {
          // @ts-ignore
          window.hcaptcha.reset(captchaWidget.value);
        }
      } catch (error) {
        console.error("Error resetting captcha:", error);
      }
    }
  };

  // Callback when captcha is verified
  const onCaptchaVerified = (token: string) => {
    captchaToken.value = token;
    captchaError.value = null;
  };

  // Callback when captcha expires
  const onCaptchaExpired = () => {
    captchaToken.value = null;
    captchaError.value = "Captcha expired. Please verify again.";
  };

  // Callback when captcha errors
  const onCaptchaError = () => {
    captchaToken.value = null;
    captchaError.value = "Captcha verification failed. Please try again.";
  };

  // Validate captcha token
  const validateCaptcha = (): boolean => {
    if (!captchaToken.value) {
      captchaError.value = "Please complete the captcha verification.";
      return false;
    }
    return true;
  };

  return {
    captchaToken,
    captchaError,
    isCaptchaLoaded,
    captchaWidget,
    loadHCaptcha,
    initCaptcha,
    resetCaptcha,
    onCaptchaVerified,
    onCaptchaExpired,
    onCaptchaError,
    validateCaptcha,
    HCAPTCHA_SITE_KEY,
  };
};
