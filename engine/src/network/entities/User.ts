import type { SocketData } from "@/common/types/SocketData.type";
import type { ServerWebSocket } from "bun";
import { v4 } from "uuid";

export class User {
  public id: string;
  private nick: string;
  private socket: ServerWebSocket<SocketData> | null;
  public constructor(nick: string = "") {
    this.id = v4();
    this.nick = nick;
    this.socket = null;
  }

  public getNick() {
    return this.nick;
  }

  public assignSocket(socket: ServerWebSocket<SocketData>) {
    this.socket = socket;
  }

  public notify(message: string) {
    if (this.socket) {
      this.socket.send(message);
    }
  }
}
