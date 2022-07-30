import { config } from "dotenv";

config();

const {
  APP_PORT,
  SENDGRID_API_KEY,
  SENDGRID_VERIFIED_SENDER,
  CRYPTO_COMPARE_URL,
} = process.env;

const ENV = {
  APP: {
    API_PATH: "/api",
    PORT: APP_PORT ?? 3000,
    HOST: "0.0.0.0",
  },
  SENDGRID: {
    API_KEY: SENDGRID_API_KEY,
    VERIFIED_SENDER: SENDGRID_VERIFIED_SENDER,
  },
  CRYPTO_COMPARE: {
    URL: CRYPTO_COMPARE_URL,
  },
};

export { ENV };
