export class ApiResponse<T> {
  private readonly status: number;
  private readonly error: string;
  private readonly message: string;
  private readonly data: T;

  constructor(status: number, error: string, message: string, data: T) {
    this.status = status;
    this.error = error;
    this.message = message;
    this.data = data;
  }

  public static success(data: any) {
    return new ApiResponse(200, null, null, data);
  }

  public static error(
    status: number,
    error: string,
    message: string,
    data: any
  ) {
    return new ApiResponse(status, error, message, data);
  }
}
