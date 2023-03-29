"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const stompjs_1 = require("@stomp/stompjs");
const ws_1 = require("ws");
Object.assign(global, { WebSocket: ws_1.WebSocket });
const client = new stompjs_1.Client({
    brokerURL: 'ws://localhost:15674/ws',
    onConnect: () => {
        client.subscribe('/topic/test01', message => console.log(`Received: ${message.body}`));
        client.publish({ destination: '/topic/test01', body: 'First Message' });
    },
});
client.activate();
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.get('/', (req, res) => {
    res.send({ some: 'Express + TypeScript Server' });
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
