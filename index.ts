import { Hono } from "hono";
import homePage from "./src/index.html";

const app = new Hono().basePath("/api");

app.post("/cards", async (c) => {
  return c.json({
    link: `your-app://card/${Bun.randomUUIDv7()}`,
  });
});

app.get("/cards/:id", async (c) => {
  return c.json({
    email: "",
    name: "",
  });
});

Bun.serve({
  routes: {
    "/*": homePage,
    "/api/*": app.fetch,
  },
});
