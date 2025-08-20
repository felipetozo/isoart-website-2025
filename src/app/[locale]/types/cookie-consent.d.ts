declare global {
  interface Window {
    cookieconsent: {
      run: (config: CookieConsentConfig) => void;
    };
  }
}

interface CookieConsentConfig {
  notice_banner_type: "simple" | "interstitial";
  consent_type: "express" | "implied";
  palette: "light" | "dark";
  language: string;
  page_load_consent_levels: string[];
  notice_banner_reject_button_hide: boolean;
  preferences_center_close_button_hide: boolean;
  page_refresh_confirmation_buttons: boolean;
  website_name: string;
  website_privacy_policy_url: string;
}

export {};
