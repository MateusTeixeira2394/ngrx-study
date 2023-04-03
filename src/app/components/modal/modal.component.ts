import { Component, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Modal from 'src/app/models/modal.model';
import {closeModal} from '../../tools/redux/actions/modal.actions'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnDestroy {

  public modal: Modal = {
    text: '',
    opened: false
  }

  public subscription!: Subscription;

  constructor(
    private store: Store<{ modal: Modal }>
  ){
    this.subscription = store.select('modal').subscribe(result => this.modal = result);
  }

  public closeModal() : void {

    this.store.dispatch(closeModal());

    const {actionAfterModalClose: closeModalAction} = this.modal;

    if(closeModalAction) closeModalAction();

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  };

}
