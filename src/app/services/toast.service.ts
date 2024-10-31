import { Injectable } from '@angular/core';
import { IToastModel, ToastColor } from '@app/models/toast.model';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  public toastMessage = new Array<IToastModel<ToastColor>>();

  constructor() { }

  public showToast(message?: string): Required<IToastModel<ToastColor>> {
    const toastItem: Required<IToastModel<ToastColor>> = {
      color: ToastColor.SUCCESS,
      text: message || '',
      success: (message) => {
        toastItem.color = ToastColor.SUCCESS;
        toastItem.text = message;
        setTimeout(() => {
          this.toastMessage = this.toastMessage.filter(item => item !== toastItem);
        }, 4000);
      },
      error: (error: Error) => {
        toastItem.color = ToastColor.ERROR;
        toastItem.text = error.message;
        setTimeout(() => {
          this.toastMessage = this.toastMessage.filter(item => item !== toastItem);
        }, 4000);
      },
      warn: (message) => {
        toastItem.color = ToastColor.WARN;
        toastItem.text = message;
        setTimeout(() => {
          this.toastMessage = this.toastMessage.filter(item => item !== toastItem);
        }, 4000);
      }
    }
    this.toastMessage.push(toastItem);
    return toastItem;
  }

  public closeError(item: any) {
    this.toastMessage = this.toastMessage.filter(el => el !== item);
  }
}
