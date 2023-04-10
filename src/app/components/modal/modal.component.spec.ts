import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { modalReducer } from 'src/app/tools/redux/reducers/modal.reducer';
import { ButtonComponent } from '../button/button.component';
import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {

  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  const text: string = 'Some text';

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ModalComponent, ButtonComponent],
      imports: [
        StoreModule.forRoot({
          modal: modalReducer
        })
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;

    component.modal = {
      opened: true,
      text
    }

    fixture.detectChanges();

  });

  describe('UI', () => {

    it('should be created with text and without header', () => {

      const textComponent: HTMLElement = fixture.nativeElement.querySelector('.modal-text');
      const headerComponent: HTMLElement = fixture.nativeElement.querySelector('.modal-header');

      expect(component).toBeTruthy();
      expect(textComponent.textContent).toEqual(text);
      expect(headerComponent).toBeNull();

    });

    it('should be created with empty buttons', () => {

      let modalButtons: HTMLElement = fixture.nativeElement.querySelector('.modal-buttons');

      expect(component).toBeTruthy();
      expect(modalButtons.childElementCount).toBe(0);

    });

    it('should be created with header when hasHeader is true', () => {

      const headerTitle: string = 'Header title';

      component.modal.hasHeader = true;
      component.modal.headerTitle = headerTitle;

      fixture.detectChanges();

      const modalHeaderTitle: HTMLElement = fixture.nativeElement.querySelector('.modal-header-title');

      expect(modalHeaderTitle.textContent).toEqual(headerTitle);

    });

    it('should not be created when the opened is false', () => {

      component.modal.opened = false;

      fixture.detectChanges();

      const modal: HTMLElement = fixture.nativeElement.querySelector('.modal-container');

      expect(modal).not.toBeTruthy();

    });

    it('should create two buttons', () => {

      component.modal.buttons = [
        {
          text: 'Button 1',
          action: jasmine.createSpy()
        },
        {
          text: 'Button 2',
          action: jasmine.createSpy()
        }
      ];

      fixture.detectChanges();

      const buttonsContainer: HTMLElement = fixture.nativeElement.querySelector('.modal-buttons');

      expect(buttonsContainer.childElementCount).toBe(2);

    });

    it(`should close modal when the ${ModalComponent.prototype.closeModal.name} method is called`, () => {

      let modal: HTMLElement = fixture.nativeElement.querySelector('.modal-container');

      expect(modal).toBeTruthy();

      component.closeModal();

      fixture.detectChanges();

      modal = fixture.nativeElement.querySelector('.modal-container');

      expect(modal).toBeNull();

    });


  });



});
