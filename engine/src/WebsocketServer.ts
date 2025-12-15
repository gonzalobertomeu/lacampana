import type { Server, ServerWebSocket, WebSocketHandler } from "bun";
import { v4 } from "uuid";
import { rooms } from "./api/rooms.controller";

export interface WebsocketData {
  id: string;
  roomId: string;
}
export interface WebsocketServerInput {
  port?: number;
  dispatcher: WebSocketHandler<WebsocketData>;
}

export class WebsocketServer {
  /**
   * Server instance
   */
  private ws: Server<WebsocketData>;
  public constructor(input: WebsocketServerInput) {
    this.ws = Bun.serve<WebsocketData>({
      fetch(req, server) {
        const url = new URL(req.url);
        if (url.pathname.startsWith("/ws")) {
          const parts = url.pathname.split("/");
          const roomId = parts[3] ?? "";
          console.log({ roomId });
          if (server.upgrade(req, { data: { id: v4(), roomId } })) {
            return;
          }
          return new Response("Upgrade failed", { status: 500 });
        }
      },
      websocket: input.dispatcher,
      port: input.port ?? 1234,
      routes: rooms,
    });
  }

  public getServer(): Server<WebsocketData> {
    return this.ws;
  }
}
