import { Injectable } from '@angular/core';
import { TUserDetails } from '@app/models/common';

@Injectable({
  providedIn: 'root'
})
export class ConfigData {

  constructor() {
    const userDetail = localStorage.getItem('userDetails');
    console.log(userDetail);
    
    if (userDetail) {
      this._userDetail = JSON.parse(userDetail);
    }
  }

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
