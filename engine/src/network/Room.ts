import { v4 } from "uuid";
import { User } from "./User";
import type { ServerWebSocket } from "bun";

export class Room {
  // private game;
  public id: string;
  public constructor(
    public users: Map<string, User> = new Map<string, User>(),
  ) {
    this.id = v4();
  }

  public createUser(nick: string, socket: ServerWebSocket<any>) {
    const user = new User(nick, socket);
    this.users.set(user.id, user);
    return user;
  }
  // public startGame() {
  //   this.game = 1;
  // }
}
