import { Injectable } from '@angular/core';
import { TUserDetails } from '@app/models/common';

@Injectable({
  providedIn: 'root'
})
export class ConfigData {

  constructor() { }

  private _userDetail: TUserDetails = {
    userId: '',
    name: '',
    email: ''
  }
  public get userDetail(): TUserDetails {
    return this._userDetail;
  }

  public set userDetail(value: TUserDetails) {
    this._userDetail = value;
  }
}
