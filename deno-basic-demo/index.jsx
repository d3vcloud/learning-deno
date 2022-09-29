import React from "https://esm.sh/react";
import {renderToString} from "https://esm.sh/react-dom/server";
import { serve } from "./deps.ts";

export default function App({url}) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        body {
          font-family: system-ui;
          display: grid;
          place-content: center;
          height: 100vh;
          margin: 0;
        }
      `}}>
      </style>
      {
        url === '/login' && <><input placeholder="Name"/></>
      }
      {
        url === '/' && <>
          <h1>From deno</h1>
          <button>Click me 👀!</button>
        </>
      }
    </>
  )
}

// console.log(renderToString(<App />))

serve((req) => {
  const url = new URL(req.url)
  const app = renderToString(<App url={url.pathname}/>)
  return new Response(app, {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
}, { port: 3000 });