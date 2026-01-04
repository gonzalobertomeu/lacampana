import type { SocketData } from "./common/types/SocketData.type";
import { Gatekeeper } from "./network/Gatekeeper";
import { Server } from "./network/Server";

export class Engine {
  private server: Server<SocketData>;
  private gatekeeper: Gatekeeper;
  public constructor() {
    this.gatekeeper = new Gatekeeper();
    this.server = new Server({
      ws: this.gatekeeper.websocket(),
      routes: this.gatekeeper.routes(),
    });
    this.gatekeeper.createRoom("default");
  }
  public getServer() {
    return this.server;
  }

  public getGatekeeper() {
    return this.gatekeeper;
  }
}
