import { ExpressApp } from "./app";
import { init } from "./infra/db/prisma-client";

init().catch((err) => {
  return err;
});

const app = new ExpressApp();
app.start(process.env.PORT);
