import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TUserLogin, TUserRegister } from '@app/models/common';
import { CommonRoute } from '@app/models/common-route';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  public userLogin(payload: TUserLogin): Observable<any> {
    return this.http.post(CommonRoute.login, payload);
  }

  public userRegister(payload: TUserRegister): Observable<any> {
    return this.http.post(CommonRoute.register, payload);
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}