import mongoose from "mongoose";
import config from "../utils/config";
import logger from "../utils/logger";
import { Application } from "express";

export const connect = (app: Application) => {
  const connectWithRetry = async () => {
    const mongoURI = config.MONGODB_URI;
    if (!mongoURI) {
      logger.error("MongoDB URI is not defined in the configuration.");
      return;
    }
    try {
      await mongoose.connect(mongoURI);
      if (process.env.NODE_ENV !== 'test') {
        logger.info("MongoDB is connected");
      }
      app.emit("ready");
    } catch (err) {
      logger.error(
        "MongoDB connection unsuccessful, retry after 2 seconds.",
        err
      );
      setTimeout(connectWithRetry, 2000);
    }
  };

  connectWithRetry();
};
