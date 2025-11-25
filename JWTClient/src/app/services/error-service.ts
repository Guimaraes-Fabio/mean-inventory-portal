import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private errorAlertListener = new Subject<string[]>();

  constructor() { }

  getErrorAlertListener() {
    return this.errorAlertListener.asObservable();
  }

  issueErrorAlert(messages: string[]) {
    this.errorAlertListener.next(messages);
  }
}
