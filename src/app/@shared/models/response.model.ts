export class Response<T> {
  data: T;
  support: {
    url: string;
    text: string;
  };
}