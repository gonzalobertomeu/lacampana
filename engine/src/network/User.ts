import type { ServerWebSocket } from "bun";
import { v4 } from "uuid";
export class User {
  public readonly id: string;
  public socket: ServerWebSocket<any> | null;
  public constructor(
    public readonly nick: string,
    socket: ServerWebSocket<any>,
  ) {
    this.id = v4();
    this.socket = socket;
    this.socket.send(`Welcome ${this.nick}`);
  }

  public disconnect() {
    this.socket = null;
  }
}
