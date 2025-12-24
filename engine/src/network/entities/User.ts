import { v4 } from "uuid";

export class User {
  public id: string;
  private nick: string;
  private socket: any;
  public constructor(nick: string = "") {
    this.id = v4();
    this.nick = nick;
    this.socket = {};
  }

  public getNick() {
    return this.nick;
  }
}
