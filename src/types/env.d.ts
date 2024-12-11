/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_USER_HOST: string;
  readonly VITE_CAPTCHA_SCRIPT_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}