import { Hono } from "hono";
import homePage from "./src/index.html";
import { sql } from "bun";
import z from "zod";

const app = new Hono().basePath("/api");

const CreateCardRequest = z.object({
  email: z.email(),
  name: z.string().nonempty(),
});

app.post("/cards", async (c) => {
  const { email, name } = CreateCardRequest.parse(await c.req.json());
  const id = Bun.randomUUIDv7();

  const payload = { id, email, name };
  await sql`INSERT INTO cards ${sql(payload)}`;

  return c.json({
    link: `exponfc://card?uuid=${id}`,
  });
});

app.get("/cards/:id", async (c) => {
  const { id } = c.req.param();

  const [card] = await sql<Card[]>`SELECT * FROM cards WHERE id = ${id}`;
  if (!card) {
    return c.json({ error: "Card not found" }, 404);
  }

  return c.json(card);
});

Bun.serve({
  routes: {
    "/*": homePage,
    "/api/*": app.fetch,
  },
});

interface Card {
  id: string;
  email: string;
  name: string;
}

await sql`
  CREATE TABLE IF NOT EXISTS cards (
    id TEXT NOT NULL PRIMARY KEY,
    email TEXT NOT NULL,
    name TEXT NOT NULL
  );
`;
