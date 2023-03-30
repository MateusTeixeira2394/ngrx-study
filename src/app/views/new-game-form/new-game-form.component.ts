import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import Modal from 'src/app/models/modal.model';
import StatusBar from '../../models/status-bar.model';
import { setTitle } from '../../tools/redux/actions/status-bar.actions';
import { setModal, closeModal } from '../../tools/redux/actions/modal.actions'

@Component({
  selector: 'app-new-game-form',
  templateUrl: './new-game-form.component.html',
  styleUrls: ['./new-game-form.component.css']
})
export class NewGameFormComponent {

  private readonly modal: Modal = {
    opened: true,
    text: `Once you press the "start now" button below the timer will begin. How less the time you complete the game it's better!`,
    hasHeader: true,
    headerTitle: "Are you ready?",
    buttons: [
      {
        text: 'Start now',
        action: () => console.log('started the game')
      },
      {
        text: 'Cancel',
        action: () => this.store.dispatch(closeModal())
      }
    ]
  };

  constructor(
    private router: Router,
    private store: Store<{ statusbar: StatusBar, modal: Modal }>,
  ) {
    this.store.dispatch(setTitle({ statusbar: { title: 'New game' } }));
  };

  public goToHome(): void {
    this.router.navigate(['home']);
  }

  public start(form: NgForm): void {

    if (form.valid) {
      this.store.dispatch(setModal({ modal: this.modal }));
    } else {

      if (form.controls['name']?.errors) {
        document.getElementById('input-name')?.focus();
      };

    };

  };

}
