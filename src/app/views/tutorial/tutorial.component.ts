import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import StatusBar from 'src/app/models/status-bar.model';
import { setTitle } from '../../tools/redux/actions/status-bar.actions'
import { TUTORIAL_HEADER_TITLE } from './tutorial.constants';
import { ROUTE_HOME } from 'src/app/app.constants';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css']
})
export class TutorialComponent {

  constructor(
    private store: Store<{ statusbar: StatusBar }>,
    private router: Router
  ) {

    this.store.dispatch(setTitle({statusbar: {title: TUTORIAL_HEADER_TITLE}}));

  };

  public goToHome(): void {
    this.router.navigate([ROUTE_HOME]);
  };

}
