import { serve } from "./deps.ts";

serve(() => new Response("Hello Deno from Server\n"), { port: 3001 });