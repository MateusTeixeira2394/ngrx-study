import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankedsComponent } from './rankeds.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { StoreModule } from '@ngrx/store';
import { statusBarReducer } from 'src/app/tools/redux/reducers/status-bar.reducer';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import Game from 'src/app/models/game.model';
import GameService from 'src/app/services/game.service';

describe(RankedsComponent.name, () => {

  let component: RankedsComponent;
  let fixture: ComponentFixture<RankedsComponent>;
  let router: Router;
  let gameService: GameService;
  let gameServiceMock: jasmine.SpyObj<GameService>;

  beforeEach(async () => {

    gameServiceMock = jasmine.createSpyObj(['getRankedGame']);
    gameServiceMock.getRankedGame.and.returnValue([
      {
        player: 'player A',
        difficulty: 'normal',
        mines: 0,
        rowsNCols: 16,
        time: 180
      },
      {
        player: 'player B',
        difficulty: 'easy',
        mines: 0,
        rowsNCols: 12,
        time: 50
      },
      {
        player: 'player C',
        difficulty: 'easy',
        mines: 0,
        rowsNCols: 12,
        time: 60
      }
    ]);

    await TestBed.configureTestingModule({
      declarations: [RankedsComponent, ButtonComponent],
      imports: [
        StoreModule.forRoot({
          statusbar: statusBarReducer
        }),
        RouterTestingModule
      ],
      providers: [
        { provide: GameService, useValue: gameServiceMock }
      ]
    })
      .compileComponents();

    router = TestBed.get(Router);
    fixture = TestBed.createComponent(RankedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it("should show three ranked games and should not show the feedback message", () => {

    const feedbackComp: HTMLElement = fixture.nativeElement.querySelector('.games-empty-text');

    const cardsRanked: NodeList = fixture.nativeElement.querySelectorAll('.card-ranked');

    expect(feedbackComp).toBeNull();
    expect(cardsRanked.length).toEqual(3);

  });

  it("should show a feedback message to the user when there aren't any ranked game", () => {

    component.games = [];

    fixture.detectChanges();

    const feedbackComp: HTMLElement = fixture.nativeElement.querySelector('.games-empty-text');

    expect(feedbackComp).toBeTruthy();

  });

  it(`should navigate the router when the ${RankedsComponent.prototype.goToHome.name} method is called`, () => {

    const spy: jasmine.Spy = spyOn(router,"navigate");

    component.goToHome();

    expect(spy).toHaveBeenCalled();

  });

});
