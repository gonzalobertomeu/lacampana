import { sleep, type BunRequest, type Server } from "bun";
import { Room } from "./entities/Room";
import { NotFound } from "@/common/errors/NotFound.error";
import { User } from "./entities/User";
import type { WebsocketMethods } from "./Server";
import type { SocketData } from "@/common/types/SocketData.type";

export class Gatekeeper {
  private rooms: Set<Room>;
  public constructor() {
    this.rooms = new Set();
  }

  public listRooms() {
    return [...this.rooms];
  }

  public getRoom(id: string) {
    const room = [...this.rooms].find((room) => (room.id = id));
    if (!room) throw new NotFound("Room", id);
    return room;
  }

  public createRoom(id?: string) {
    const room = new Room(id);
    this.rooms.add(room);
    return room;
  }

  public userConnect(nick: string, roomId: string) {
    const user = new User(nick);
    const room = this.getRoom(roomId);
    room.addUser(user);
    return user;
  }

  public websocket(): WebsocketMethods<SocketData> {
    return {
      open(ws) {
        console.log("User connected: " + ws.data.nick);
        ws.send("Connected succesfully");
      },
      async message(ws, message) {
        console.log(`Message: ${message} from room ${ws.data.nick}`);
        console.log({ message });
        if (message == "ping\n") {
          await sleep(1000);
          ws.send("Pong");
        }
        ws.send("Thanks for chatting");
      },
    };
  }
  public routes() {
    return {
      "/connect": (req: BunRequest, server: Server<SocketData>) => {
        console.log(`Room id: ${req.params.roomId}`);
        try {
          const url = new URL(req.url);
          const roomId = url.searchParams.get("room");
          if (!roomId) throw new Error("RoomId is needed");
          const nick = url.searchParams.get("nick") ?? "random player";
          console.log(nick);
          const room = this.getRoom(roomId);
          if (server.upgrade(req, { data: { room, nick } })) {
            return;
          }
          return new Response("Failed to upgrade", { status: 400 });
        } catch (error) {
          if (error instanceof Error) {
            console.log(error.message);
            return new Response(error.message, { status: 400 });
          }
        }
      },
      "/api/rooms": {
        GET: () => {
          console.log("getting room");
          const rooms = this.listRooms();
          return Response.json(rooms);
        },
        POST: () => {
          console.log("creating rooms");
          const room = this.createRoom();
          return Response.json(room);
        },
      },
    };
  }
}
