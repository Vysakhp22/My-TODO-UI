import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TCommonResponse, TUserLogin, TUserLoginResponse, TUserRegister } from '@app/models/common';
import { CommonRoute } from '@app/models/common-route';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  public userLogin(payload: TUserLogin): Observable<TUserLoginResponse> {
    return this.http.post<TUserLoginResponse>(CommonRoute.login, payload);
  }

  public userRegister(payload: TUserRegister): Observable<TCommonResponse> {
    return this.http.post<TCommonResponse>(CommonRoute.register, payload);
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}