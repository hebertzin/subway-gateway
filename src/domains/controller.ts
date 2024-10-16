export interface HttpResponse {
  statusCode: number;
  msg: string;
  body?: unknown;
}

export interface Controller<T = unknown> {
  handle(request: T): Promise<HttpResponse>;
}
