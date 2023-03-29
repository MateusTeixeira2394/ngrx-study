import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { setTitle } from '../../tools/redux/actions/status-bar.actions'
import StatusBar from '../../models/status-bar.model';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.css']
})
export class StatusBarComponent implements OnDestroy {

  public title: string = '';
  public subscription!: Subscription;

  constructor(
    private store: Store<{ statusbar: StatusBar }>
  ) {
    this.subscription = store.select('statusbar').subscribe(result => this.title=result.title);
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
;

}
