import { Injectable } from '@angular/core';
declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  confirm(message: string, okCallback: () => any) {
    alertify.confirm(message, function (e) {
      if (e) {
        okCallback();
      } else { }
    });
  }

  success(message: string){
    alertify.success(message, 3);
  }

  error(message: string){
    alertify.error(message, 3);
  }

  warning(message: string){
    alertify.warning(message, 3);
  }

  message(message: string){
    alertify.message(message, 3);
  }

}
