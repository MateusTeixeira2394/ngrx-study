import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialComponent } from './tutorial.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { statusBarReducer } from 'src/app/tools/redux/reducers/status-bar.reducer';

describe(TutorialComponent.name, () => {
  let component: TutorialComponent;
  let fixture: ComponentFixture<TutorialComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorialComponent, ButtonComponent ],
      imports: [
        StoreModule.forRoot({
          statusbar: statusBarReducer
        }),
        RouterTestingModule
      ]
    })
    .compileComponents();

    router = TestBed.get(Router);
    fixture = TestBed.createComponent(TutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it(`should trigger the router navigate when the ${TutorialComponent.prototype.goToHome} method is called.`, ()=>{

    const spy: jasmine.Spy = spyOn(router,"navigate");

    component.goToHome();

    expect(spy).toHaveBeenCalled();

  });


});
