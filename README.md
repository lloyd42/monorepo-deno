# Monorepo Deno

This is a monorepo example using Deno, Hono, Vite and React.

## Workspaces

This project uses workspaces to allow RPC type inference between frontend and
backend. Backend exports types from `main.ts` which are then imported in
`apps/web/src/api.ts`. `hono/client` is used to make RPC calls and provides
end-to-end type safety.

## Run the app

Services are intended to be run in separate processes.

```bash
deno task api:dev
deno task web:dev
```

## Testing

```bash
deno task test
```
