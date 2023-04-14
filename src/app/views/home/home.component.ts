import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import StatusBar from 'src/app/models/status-bar.model';
import { setTitle } from 'src/app/tools/redux/actions/status-bar.actions';
import { HOME_HEADER_TITLE } from './home.constants';
import { ROUTE_NEW_GAME, ROUTE_RANKEDS, ROUTE_TUTORIAL } from 'src/app/app.constants';

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
    this.store.dispatch(setTitle({statusbar:{title: HOME_HEADER_TITLE}}));
  };

  public goToNewGame(): void {
    this.router.navigate([ROUTE_NEW_GAME]); 
  };

  public goToRankeds(): void {
    this.router.navigate([ROUTE_RANKEDS]);
  };

  public goToTutorial(): void {
    this.router.navigate([ROUTE_TUTORIAL]);
  };

}
