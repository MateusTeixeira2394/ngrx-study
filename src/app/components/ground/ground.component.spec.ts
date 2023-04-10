import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroundComponent } from './ground.component';

describe(GroundComponent.name, () => {
  let component: GroundComponent;
  let fixture: ComponentFixture<GroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroundComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });



  describe('UI tests', () => {

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it(`Should be created with no text when there aren't any mines around`, () => {

      const text: HTMLElement = fixture.nativeElement.querySelector('p');

      expect(text).toBeNull();

    });

    it(`Should be created with text when there are mines around`, () => {

      const minesAround: number = 2;

      component.ground.minesAround = minesAround;

      fixture.detectChanges();

      const text: HTMLElement = fixture.nativeElement.querySelector('p');

      expect(text).not.toBeNull();
      expect(text.textContent).toEqual(minesAround.toString());

    });

  });

  describe(`#${GroundComponent.prototype.getClassStyle.name}`, () => {

    it(`Should contain known and is-mine in a list of classes`, () => {

      component.ground.known = true;
      component.ground.isMine = true;

      fixture.detectChanges();

      const classes: string[] = component.getClassStyle();

      expect(classes).toContain('known');
      expect(classes).toContain('is-mine');

    });

    it(`Should contain safezone and unknown in a list of classes`, () => {

      component.ground.known = false;
      component.ground.isMine = false;

      fixture.detectChanges();

      const classes: string[] = component.getClassStyle();

      expect(classes).toContain('unknown');
      expect(classes).toContain('safezone');

    });

    it(`Should not contain safezone in a list of classes`, () => {

      component.ground.known = false;
      component.ground.minesAround = 3;

      fixture.detectChanges();

      const classes: string[] = component.getClassStyle();

      expect(classes).not.toContain('safezone');

    });

    it(`Should contain is-flag in a list of classes`, () => {

      component.ground.isFlag = true;

      fixture.detectChanges();

      const classes: string[] = component.getClassStyle();

      expect(classes).toContain('is-flag');

    });

  });

  describe(`#${GroundComponent.prototype.getClassOfNumbers.name}`, () => {

    it('Should contain "one" in a list of classes', () => {

      component.ground.minesAround = 1;

      fixture.detectChanges();

      const classes: string[] = component.getClassOfNumbers();

      expect(classes).toContain('one');

    });

    it('Should contain "two" in a list of classes', () => {

      component.ground.minesAround = 2;

      fixture.detectChanges();

      const classes: string[] = component.getClassOfNumbers();

      expect(classes).toContain('two');

    });

    it('Should contain "three" in a list of classes', () => {

      component.ground.minesAround = 3;

      fixture.detectChanges();

      const classes: string[] = component.getClassOfNumbers();

      expect(classes).toContain('three');

    });

    it('Should contain only the "mineAround" in a list of classes', () => {

      component.ground.minesAround = 4;

      fixture.detectChanges();

      const classes: string[] = component.getClassOfNumbers();

      expect(classes).toContain('mineAround');
      expect(classes.length).toBe(1);

    });

  });


});
