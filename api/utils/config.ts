import dotenv from "dotenv";
dotenv.config();

interface Config {
  PORT: string | undefined;
  MONGODB_URI: string | undefined;
}

const config: Config = {
  PORT: process.env.PORT,
  MONGODB_URI:
    process.env.NODE_ENV === "test"
      ? process.env.TEST_MONGODB_URI
      : process.env.MONGODB_URI
};

export default config;
