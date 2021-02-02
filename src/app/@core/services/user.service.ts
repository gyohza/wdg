import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagedRequest } from 'src/app/@shared/models/paged-request.model';
import { PagedResponse } from 'src/app/@shared/models/paged-response.model';
import { Response } from 'src/app/@shared/models/response.model';
import { User } from 'src/app/@shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _http: HttpClient,
  ) { }

  getUsers(req: PagedRequest = new PagedRequest()) {
    return this._http.get<PagedResponse<User[]>>(
      `users?${new URLSearchParams(Object.entries(req))}`
    );
  }

  getUser(id: number) {
    return this._http.get<Response<User>>(
      `users/${id}`
    );
  }

  updateUser(user: User) {
    return this._http.put<User>(
      `users/${user.id}`,
      { name: `${user.first_name} ${user.last_name}`}
    );
  }

  deleteUser(id: number) {
    return this._http.delete<User>(
      `users/${id}`
    );
  }
}
