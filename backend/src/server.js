import app from "./app.js";
import { ENV } from "./config/env.js";
import job from "./config/cron.js";

if (ENV.NODE_ENV === "production" && process.env.API_URL) {
  try {
    job.start();
  } catch (error) {
    console.log("Cron not started", error);
  }
}

app.listen(ENV.PORT, () => {
  console.log(`Server listening on port ${ENV.PORT}`);
});
