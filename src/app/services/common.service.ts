import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2'

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

  showError(message?:string): void {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message ?? 'Something went wrong!'
    })
  }

  showSuccess(message: string): void {
    Swal.fire({
      icon: 'success',
      text: message
    })
  }

}
