import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagedRequest } from 'src/app/@shared/models/paged-request.model';
import { PagedResponse } from 'src/app/@shared/models/paged-response.model';
import { User } from 'src/app/@shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _http: HttpClient,
  ) { }

  getUsers(req: PagedRequest = new PagedRequest()) {
    return this._http.get<PagedResponse<User>>(
      `users?${new URLSearchParams(Object.entries(req))}`
    );
  }
}
