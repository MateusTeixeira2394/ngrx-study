import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { StatusBarComponent } from './components/status-bar/status-bar.component';
import { ModalComponent } from './components/modal/modal.component';
import { StoreModule } from '@ngrx/store';
import { statusBarReducer } from './tools/redux/reducers/status-bar.reducer';
import { modalReducer } from './tools/redux/reducers/modal.reducer';

describe('AppComponent', () => {


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({
          statusbar: statusBarReducer,
          modal: modalReducer
        })
      ],
      declarations: [
        AppComponent,
        StatusBarComponent,
        ModalComponent
      ],
    }).compileComponents();

  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
