import { ExpressApp } from "./app";

const app = new ExpressApp();

app.start(process.env.PORT);