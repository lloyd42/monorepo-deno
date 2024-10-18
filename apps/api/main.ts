import { Hono } from "npm:hono";
import { z } from "npm:zod";
import { zValidator } from "npm:@hono/zod-validator";
import { hc } from "npm:hono/client";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";

export const app = new Hono()
  .use(
    cors({
      origin: "*",
      allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    })
  )
  .use(logger())
  .get("/", (c) => {
    return c.json("Hello Hono!");
  })
  .post(
    "/",
    zValidator(
      "json",
      z.object({
        name: z.string(),
      })
    ),
    (c) => {
      const { name } = c.req.valid("json");
      return c.json(`Hello ${name}!`);
    }
  );

Deno.serve(app.fetch);

export type Api = typeof app;
export const client = hc<Api>("http://localhost:8000");
