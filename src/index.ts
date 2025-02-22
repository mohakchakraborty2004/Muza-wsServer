import express from "express";
import { WebSocketServer } from "ws";
import cors from "cors";
import SpaceManager from "./spaceManager";
import dotenv from "dotenv";


const app = express();

const port = 8080;

app.use(cors());

const server = app.listen(port,()=> {
    console.log(`server running on port ${port}`)
} )

const wss = new WebSocketServer({server});
const sm = new SpaceManager()

wss.on("connection", (socket) => {
    socket.send("connected"); 

    socket.on("message", (message) => {
        const parsedMsg = JSON.parse(message.toString());
        sm.handleMesage(message, socket);
    })

    socket.on("close", () => {
        console.log("socket closed");
    })
})
