import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreModule } from '@ngrx/store';
import {RouterTestingModule} from '@angular/router/testing'
import { ButtonComponent } from 'src/app/components/button/button.component';
import { statusBarReducer } from 'src/app/tools/redux/reducers/status-bar.reducer';
import { HomeComponent } from './home.component';
import { Router } from '@angular/router';

describe(HomeComponent.name, () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent, ButtonComponent],
      imports: [
        StoreModule.forRoot({
          statusbar: statusBarReducer
        }),
        RouterTestingModule
      ]
    })
      .compileComponents();

    router = TestBed.get(Router);
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should show image', () => {

    const img: HTMLElement = fixture.nativeElement.querySelector('img');

    expect(img).toBeTruthy();

  });

  it(`should trigger the router's navigate method when the ${HomeComponent.prototype.goToTutorial} method is called`, () => {

    const spy: jasmine.Spy = spyOn(router,"navigate");

    component.goToTutorial();

    expect(spy).toHaveBeenCalled();

  });

  it(`should trigger the router's navigate method when the ${HomeComponent.prototype.goToRankeds} method is called`, () => {

    const spy: jasmine.Spy = spyOn(router,"navigate");

    component.goToRankeds();

    expect(spy).toHaveBeenCalled();

  });

  it(`should trigger the router's navigate method when the ${HomeComponent.prototype.goToNewGame} method is called`, () => {

    const spy: jasmine.Spy = spyOn(router,"navigate");

    component.goToNewGame();

    expect(spy).toHaveBeenCalled();

  });

});
