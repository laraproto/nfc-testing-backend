import { Hono } from "hono";
import homePage from "./src/index.html";

const app = new Hono().basePath("/api");

Bun.serve({
  routes: {
    "/*": homePage,
    "/api/*": app.fetch,
  },
});
