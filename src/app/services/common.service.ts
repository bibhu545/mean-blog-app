import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private loading: Subject<boolean> = new Subject<boolean>();
  loading$ = this.loading.asObservable();

  constructor() { }

  setLoding(status: boolean): void {
    this.loading.next(status);
  }

}
