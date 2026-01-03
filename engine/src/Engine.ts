import { Gatekeeper } from "./network/Gatekeeper";
import { Server } from "./network/Server";

export class Engine {
  private server: Server;
  private gatekeeper: Gatekeeper;
  public constructor() {
    this.gatekeeper = new Gatekeeper();
    this.server = new Server({
      ws: this.gatekeeper.handle(),
      routes: this.gatekeeper.api(),
    });
  }
  public getServer() {
    return this.server;
  }

  public getGatekeeper() {
    return this.gatekeeper;
  }
}
