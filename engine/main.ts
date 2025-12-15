import { Network } from "@/Network";
import { WebsocketServer } from "@/WebsocketServer";
import { server } from "typescript";

const network = Network.getInstance();
const wss = new WebsocketServer({
  port: 1234,
  dispatcher: {
    open(ws) {
      console.log("New connection");
      const roomId = ws.data.roomId;
      try {
        const room = network.getRoom(roomId);
        room.createUser("Gonzalo", ws);
      } catch (err) {
        console.log("room not found");
        ws.close(1008, "Room not found");
        return;
      }
      ws.send("Welcome to server");
    },
    message(ws, message) {
      console.log(`Message received ${message}`);
      ws.send("Received");
    },
  },
});

console.log("Server running on port " + wss.getServer().port);
