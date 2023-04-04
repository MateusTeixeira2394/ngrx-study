import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import StatusBar from 'src/app/models/status-bar.model';
import { setTitle } from '../../tools/redux/actions/status-bar.actions'

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

    this.store.dispatch(setTitle({statusbar: {title: 'Tutorial'}}));

  };

  public goToHome(): void {
    this.router.navigate(['home']);
  };

}
