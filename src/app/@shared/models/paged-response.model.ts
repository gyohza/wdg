import { Response } from "./response.model";

export class PagedResponse<T> extends Response<T>{
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}