export class ApiError extends Error {
  public status: number | undefined;

  constructor(message: string) {
    super(message);
    this.name = "ApiError";
  }

  setStatus(status: number) {
    this.status = status;
  }
}
