import type { Server as ServerBun, ServerWebSocket } from "bun";

export interface WebsocketMethods<T> {
  open: (ws: ServerWebSocket<T>) => void;
  message: (
    ws: ServerWebSocket<T>,
    message: string | Buffer<ArrayBuffer>,
  ) => void;
  close?: (
    ws: ServerWebSocket<T>,
    code: number,
    message: string | Buffer<ArrayBuffer>,
  ) => void;
}
export interface ServerProps<T> {
  ws: WebsocketMethods<T>;
  routes: any;
}
export class Server<T = undefined> {
  private server: ServerBun<T>;
  public constructor({ ws, routes }: ServerProps<T>) {
    this.server = Bun.serve<T>({
      websocket: ws,
      port: process.env.PORT ?? 3000,
      routes: routes,
    });
  }
  public getServer() {
    return this.server;
  }
  public status() {
    console.log(`Server running on port ${this.server.port}`);
  }
}
