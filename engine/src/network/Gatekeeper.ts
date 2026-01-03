import { Room } from "./entities/Room";
import { NotFound } from "@/common/errors/NotFound.error";
import { User } from "./entities/User";
import type { ServerProps, WebsocketMethods } from "./Server";

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

  public createRoom() {
    const room = new Room();
    this.rooms.add(room);
    return room;
  }

  public userConnect(nick: string, roomId: string) {
    const user = new User(nick);
    const room = this.getRoom(roomId);
    room.addUser(user);
    return user;
  }

  public handle(): WebsocketMethods {
    return {
      open(ws) {
        console.log("User connected");
        ws.send("Connected succesfully");
      },
      message(ws, message) {
        console.log(`Message: ${message}`);
        ws.send("Thanks for chatting");
      },
    };
  }
  public api() {
    return {
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
