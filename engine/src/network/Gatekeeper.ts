import { Room } from "./entities/Room";
import { NotFound } from "@/common/errors/NotFound.error";
import { User } from "./entities/User";

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
}
