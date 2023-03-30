import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import StatusBar from '../../models/status-bar.model';
import { setTitle } from '../../tools/redux/actions/status-bar.actions';

@Component({
  selector: 'app-new-game-form',
  templateUrl: './new-game-form.component.html',
  styleUrls: ['./new-game-form.component.css']
})
export class NewGameFormComponent {

  constructor(
    private router: Router,
    private store: Store<{statusbar: StatusBar}>
  ){
    this.store.dispatch(setTitle({statusbar: {title: 'New game'}}));  
  };

  public goToHome(): void {
    this.router.navigate(['home']);
  }

  public start(form: NgForm): void {
    console.log(form)
    if(form.valid){
      alert('New Game begun!');
    } else {

      if(form.controls['name']?.errors){
        document.getElementById('input-name')?.focus();
      };

    }

  }

}
