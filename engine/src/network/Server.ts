import type { Server as ServerBun, ServerWebSocket } from "bun";

export interface ServerProps {
  open: (ws: ServerWebSocket) => void;
  message: (ws: ServerWebSocket, message: string | Buffer<ArrayBuffer>) => void;
  close?: (
    ws: ServerWebSocket,
    code: number,
    message: string | Buffer<ArrayBuffer>,
  ) => void;
}
export class Server {
  private server: ServerBun<undefined>;
  public constructor(methods: ServerProps) {
    this.server = Bun.serve({
      websocket: methods,
      fetch(req, server) {
        if (server.upgrade(req, undefined)) {
          return;
        }
        throw new Error("Upgrade failed");
      },
    });
    console.log(`Server running on port ${this.server.port}`);
  }
  public getServer() {
    return this.server;
  }
}
