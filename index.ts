import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

import http from "http"
import StompServer from 'stompServer'
 
var server = http.createServer();
var stompServer = new StompServer({server: server});
 
server.listen(61614);
 
stompServer.subscribe("/**", function(msg, headers) {
  var topic = headers.destination;
  console.log(topic, "->", msg);
});
 
stompServer.send('/test', {}, 'testMsg');


dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send({ some: 'Express + TypeScript Server'} );
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});