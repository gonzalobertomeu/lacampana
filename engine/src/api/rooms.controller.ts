import { Network } from "@/Network";

const networkManager = Network.getInstance();

export const rooms = {
  "/api/rooms": {
    GET: () => {
      const rooms = networkManager.list();
      return Response.json({
        rooms: rooms.toArray(),
      });
    },
    POST: async (req: Request) => {
      const room = networkManager.createRoom();
      return Response.json({
        room,
      });
    },
  },
};
