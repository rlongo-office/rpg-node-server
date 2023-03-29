import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

const http = require("http");
const StompServer = require('stompServer');
 
const server = http.createServer();
const stompServer = new StompServer({server: server});
 
server.listen(61614);
 
stompServer.subscribe("/**", function(msg:any, headers:any) {
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

const serverObj = app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

// add serverObj to our stomp server