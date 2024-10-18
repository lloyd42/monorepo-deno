import { assertEquals } from "@std/assert";
import { app } from "./main.ts";

Deno.test("GET / returns Hello Hono!", async () => {
  const res = await app.request("/");
  assertEquals(res.status, 200);
  assertEquals(await res.json(), "Hello Hono!");
});

Deno.test("POST / with valid name returns greeting", async () => {
  const res = await app.request("/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: "Alice" }),
  });
  assertEquals(res.status, 200);
  assertEquals(await res.json(), "Hello Alice!");
});

Deno.test("POST / with invalid body returns 400", async () => {
  const res = await app.request("/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ invalid: "data" }),
  });
  assertEquals(res.status, 400);
});

Deno.test("OPTIONS / returns CORS headers", async () => {
  const res = await app.request("/", {
    method: "OPTIONS",
  });
  assertEquals(res.status, 204);
  assertEquals(res.headers.get("Access-Control-Allow-Origin"), "*");
  assertEquals(
    res.headers.get("Access-Control-Allow-Methods"),
    "GET,POST,PUT,DELETE,OPTIONS"
  );
});
