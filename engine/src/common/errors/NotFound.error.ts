export class NotFound extends Error {
  public constructor(entity: string, id: string) {
    super(`${entity} with id: ${id} not found`);
  }
}
