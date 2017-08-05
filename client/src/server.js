import { createServer } from 'http';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import dotenv from 'dotenv';
import App from './app';

const { PORT = 3000 } = dotenv.config().parsed;

createServer((req, res) => {
  const context = {};

  const html = ReactDOMServer.renderToString(
    <StaticRouter
      location={req.url}
      context={context}
    >
      <App/>
    </StaticRouter>,
  );

  if (context.url) {
    res.writeHeader(301, {
      Location: context.url,
    });
    res.end();
  } else {
    res.write(`
<html>
<!DOCTYPE html>
<head>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
  <title>Design Bright</title>
  <link rel="stylesheet" href="/style.css" media="screen" />
</head>

<body>
  <div id="root">
    ${html}
  </div>
</body>
<script src="assets/bundle.js" charset="utf-8"></script>
</html>
    `);
    res.end();
  }
}).listen(PORT);