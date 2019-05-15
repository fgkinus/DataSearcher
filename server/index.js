import keystone from "keystone";
import dotEnv from "dotenv";
import routes from "./routes";

dotEnv.config();
keystone.init({
  "cookie secret": "secure string goes here",
  mongo: process.env.DEV_MONGODB_URL
});
keystone.set("locals", {
  env: keystone.get("env")
});

keystone.set("routes", routes);

keystone.import("models");

keystone.start();
