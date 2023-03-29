import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import StatusBar from 'src/app/models/status-bar.model';
import { setTitle } from 'src/app/tools/redux/actions/status-bar.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public title: string ='';

  constructor(
    private router: Router,
    private store: Store<{ statusbar: StatusBar }>
  ){
    this.store.dispatch(setTitle({statusbar:{title: "Home"}}));
  };

  public goToNewGame(): void {
    this.router.navigate(['new-game']);
  }

}
