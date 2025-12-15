import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private _loading = new BehaviorSubject<boolean>(false);
  loading$ = this._loading.asObservable();

  private startTime = 0;
  private MIN_DURATION = 2800; // ms

  show() {
    this.startTime = Date.now();
    this._loading.next(true);
  }

  hide() {
    const elapsed = Date.now() - this.startTime;
    const remaining = this.MIN_DURATION - elapsed;

    if (remaining > 0) {
      setTimeout(() => this._loading.next(false), remaining);
    } else {
      this._loading.next(false);
    }
  }
}
