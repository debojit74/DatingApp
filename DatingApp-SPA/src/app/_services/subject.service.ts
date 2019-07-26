import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  isLoading = new Subject();
  
  constructor() { }

  loadingStatus(value: boolean) {
    this.isLoading.next(value);
  }
}
