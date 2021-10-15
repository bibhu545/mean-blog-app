import { Injectable, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService
  ) { }

  openModal(templete: any, data?: any): void {
    const config: ModalOptions = {
      initialState: {
        ...data
      },
      backdrop: true,
      ignoreBackdropClick: true
    };
    this.modalRef = this.modalService.show(templete, config);
  }

  closeModal() {
    this.modalRef.hide()
  }
}
