import { v4 } from "uuid";
import { User } from "@/network/entities/User";

export class Room {
  public id: string;
  private users: Set<User>;
  public constructor() {
    this.id = v4();
    this.users = new Set();
  }

  public getUsers() {
    return [...this.users];
  }

  public addUser(user: User) {
    const exists = [...this.users].some((u) => u.id == user.id);
    if (!exists) {
      this.users.add(user);
    }
    return user;
  }
}
