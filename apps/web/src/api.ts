import { Api } from "@mono/api";
import { hc } from "hono/client";

export const api = hc<Api>("http://localhost:8000");
