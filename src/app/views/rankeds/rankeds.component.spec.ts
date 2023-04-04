import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankedsComponent } from './rankeds.component';

describe('RankedsComponent', () => {
  let component: RankedsComponent;
  let fixture: ComponentFixture<RankedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RankedsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
