import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGameFormComponent } from './new-game-form.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { statusBarReducer } from 'src/app/tools/redux/reducers/status-bar.reducer';
import { modalReducer } from 'src/app/tools/redux/reducers/modal.reducer';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import Modal from 'src/app/models/modal.model';

describe(NewGameFormComponent.name, () => {

  let component: NewGameFormComponent;
  let fixture: ComponentFixture<NewGameFormComponent>;
  let router: Router;
  let store: Store<{ modal: Modal }>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewGameFormComponent, ButtonComponent],
      imports: [
        StoreModule.forRoot({
          statusbar: statusBarReducer,
          modal: modalReducer
        }),
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ]
    })
      .compileComponents();

    router = TestBed.get(Router);
    store = TestBed.get(Store<{ modal: Modal }>);
    fixture = TestBed.createComponent(NewGameFormComponent);
    component = fixture.componentInstance;

    component.ngOnInit();
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid when the fields are empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('should invalidate the name field when it is empty', () => {

    const name = component.form.controls['name'];

    expect(name.valid).toBeFalsy();

  });

  it('should invalidate the name field and the text error should be present when it has less then 3 characters', () => {

    let name = component.form.controls['name'];

    name.setValue('aa');

    name.markAsTouched();

    fixture.detectChanges();

    const errors = name.errors || {};

    const errorText: HTMLElement = fixture.nativeElement.querySelector('.erro-texto');

    expect(errorText).toBeTruthy();

    expect(errors['minlength'])
      .toBeTruthy();

  });

  it('should validate the name field when it has more than 3 characters', () => {

    let name = component.form.controls['name'];

    name.setValue("Player's name");

    name.markAsTouched();

    fixture.detectChanges();

    expect(name.valid).toBeTruthy();

  });

  it('should invalidate the difficulty field when it is empty', () => {

    const difficulty = component.form.controls['difficulty'];

    expect(difficulty.valid).toBeFalsy();

  });

  it('should validate the difficulty field when it is filled', () => {

    let difficulty = component.form.controls['difficulty'];

    difficulty.setValue("easy");

    expect(difficulty.valid).toBeTruthy();

  });

  it('should validate the form when the name field has more than 3 characters and the difficulty field is filled and the error text should not be present', () => {

    let name = component.form.controls['name'];
    let difficulty = component.form.controls['difficulty'];

    name.setValue("Player's name");
    name.markAsTouched();

    difficulty.setValue("easy");
    difficulty.markAsTouched();

    fixture.detectChanges();

    const errorText: HTMLElement = fixture.nativeElement.querySelector('.erro-texto');

    expect(errorText).toBeNull();
    expect(component.form.valid).toBeTrue();

  });

  it(`should show the modal when the ${NewGameFormComponent.prototype.submitForm.name} is called and the form is validated`, done => {

    let name = component.form.controls['name'];
    let difficulty = component.form.controls['difficulty'];

    name.setValue("Player's name");
    name.markAsTouched();

    difficulty.setValue("easy");
    difficulty.markAsTouched();

    component.submitForm();

    store.select('modal').subscribe(modal => {

      expect(modal.opened)
        .withContext('modal: ' + modal)
        .toBeTruthy();

      done();

    });

  });

  it(`should not show the modal when the ${NewGameFormComponent.prototype.submitForm.name} is called and the form is invalid`, done => {

    component.submitForm();

    store.select('modal').subscribe(modal => {

      expect(modal.opened)
        .withContext('modal: ' + modal)
        .toBeFalsy();

      done();

    });

  });

  it(`should navigate the router when the ${NewGameFormComponent.prototype.goToHome.name} method`, () => {

    const spy: jasmine.Spy = spyOn(router, "navigate");

    component.goToHome();

    expect(spy).toHaveBeenCalled();

  });


});
