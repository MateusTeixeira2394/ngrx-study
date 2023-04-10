import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';
import Button from 'src/app/models/button.model';

describe(ButtonComponent.name, () => {

  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let button: Button = {
    text: 'Some text'
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created with some text without icon', () => {
    
    component.button = button;

    fixture.detectChanges();

    const icon: HTMLElement = fixture.nativeElement.querySelector('.button>img');

    expect(component).toBeTruthy();
    expect(component.button.text).toEqual(button.text);
    expect(component.button.icon).toBeUndefined();
    expect(icon).toBeFalsy();

  });

  it('should be created with some text with icon', () => {
    
    const iconPath: string = './path/to/icon';

    component.button.icon = iconPath;

    fixture.detectChanges();

    const icon: HTMLElement = fixture.nativeElement.querySelector('.button>img');

    expect(component.button.icon).toEqual(iconPath); 
    expect(icon).toBeTruthy();

  });

  it('Should contains the classes disabled', () => {

    component.button.disabled = true;

    fixture.detectChanges();

    const button: HTMLElement = fixture.nativeElement.querySelector('button');

    expect(button.classList).toContain('disabled'); 
  
  });

  it(`Should call the clickEvent when the button is clicked`, () => {

    let evenTrigged: boolean = false;

    component.clickEvent.subscribe(() => evenTrigged=true);

    component.click();

    expect(evenTrigged).toBe(true);

  });

});
