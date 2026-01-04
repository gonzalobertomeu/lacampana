import type { Room } from "@/network/entities/Room";

export type SocketData = {
  room: Room;
  nick: string;
};
