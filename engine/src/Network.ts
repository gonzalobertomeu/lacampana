import { Room } from "./network/Room";

export class Network {
  private static instance: Network | null;
  public static getInstance() {
    if (Network.instance == null) {
      console.log("Network instance as created");
      Network.instance = new Network();
    }
    return Network.instance;
  }
  private constructor(
    private rooms: Map<string, Room> = new Map<string, Room>(),
  ) {}

  public createRoom() {
    const room = new Room();
    this.rooms.set(room.id, room);
    return room;
  }
  public getRoom(roomId: string) {
    const room = this.rooms.get(roomId);
    if (room === undefined) {
      throw new Error("Room not found");
    }
    return room;
  }
  public list() {
    return this.rooms.values().map((room) => {
      return { ...room, users: room.users.values() };
    });
  }

  public findUser(userId: string) {
    for (const room of this.rooms.values()) {
      for (const user of room.users.values()) {
        if (user.id === userId) {
          return user;
        }
      }
    }
  }
}
