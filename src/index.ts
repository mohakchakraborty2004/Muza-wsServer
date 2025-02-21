import express from "express";
import { WebSocketServer } from "ws";
import cors from "cors";

const app = express();

const port = 8080;

app.use(cors());

const server = app.listen(port,()=> {
    console.log(`server running on port ${port}`)
} )

const wss = new WebSocketServer({server});

wss.on("connection", (socket) => {
    socket.send("connected"); 

    socket.on("message", (message) => {
        const parsedMsg = JSON.parse(message.toString());
        // space manager handle msg 
    })

    socket.on("close", () => {
        console.log("socket closed");
    })
})
