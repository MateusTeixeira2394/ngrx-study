import { Component, Input } from '@angular/core';
import Modal from 'src/app/models/modal.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  public modal: Modal = {
    text: '',
    opened: false
  }

  public closeModal() : void {
    this.modal.opened = false;
  }

}
