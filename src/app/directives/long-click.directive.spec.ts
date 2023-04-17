import { fakeAsync, tick } from '@angular/core/testing';
import { LongClickDirective } from './long-click.directive';

describe(LongClickDirective.name, () => {

  let directive: LongClickDirective;

  beforeEach(() => {

    directive = new LongClickDirective();

    spyOn(directive.longClickEvent,"emit");

  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it(`should trigger the longClickEvent event when the ${LongClickDirective.prototype.clickDown.name} method is called and the ${LongClickDirective.prototype.clickUp.name} method is called after the timeout`, fakeAsync(() => {

    directive.clickDown();

    tick(1500);

    directive.clickUp();

    expect(directive.longClickEvent.emit).toHaveBeenCalled();

  }));

  it(`should not trigger the longClickEvent event when the ${LongClickDirective.prototype.clickDown.name} method is called and the ${LongClickDirective.prototype.clickUp.name} method is called before the timeout`, fakeAsync(() => {

    directive.clickDown();

    tick(500);

    directive.clickUp();

    expect(directive.longClickEvent.emit).not.toHaveBeenCalled();

  }));

});
