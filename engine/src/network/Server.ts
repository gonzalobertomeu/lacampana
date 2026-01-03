import type { Server as ServerBun, ServerWebSocket } from "bun";

export interface WebsocketMethods {
  open: (ws: ServerWebSocket) => void;
  message: (ws: ServerWebSocket, message: string | Buffer<ArrayBuffer>) => void;
  close?: (
    ws: ServerWebSocket,
    code: number,
    message: string | Buffer<ArrayBuffer>,
  ) => void;
}
export interface ServerProps {
  ws: WebsocketMethods;
  routes: any;
}
export class Server {
  private server: ServerBun<undefined>;
  public constructor({ ws, routes }: ServerProps) {
    this.server = Bun.serve({
      websocket: ws,
      port: process.env.PORT ?? 3000,
      routes: {
        "/": (req, server) => {
          if (server.upgrade(req)) {
            return;
          }
          return new Response("Failed to upgrade");
        },
        ...routes,
      },
    });
  }
  public getServer() {
    return this.server;
  }
  public status() {
    console.log(`Server running on port ${this.server.port}`);
  }
}
