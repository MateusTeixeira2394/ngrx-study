// Modules imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms'

// Redux imports
import { statusBarReducer } from './tools/redux/reducers/status-bar.reducer';
import { modalReducer } from './tools/redux/reducers/modal.reducer';
import { gameReducer } from './tools/redux/reducers/game.reducer';

// Components imports
import { AppComponent } from './app.component';
import { GroundComponent } from './components/ground/ground.component';
import { BoardComponent } from './components/board/board.component';
import { HomeComponent } from './views/home/home.component';
import { StatusBarComponent } from './components/status-bar/status-bar.component';
import { NewGameFormComponent } from './views/new-game-form/new-game-form.component';
import { ButtonComponent } from './components/button/button.component';
import { ModalComponent } from './components/modal/modal.component';
import { BoardGameComponent } from './views/board-game/board-game.component';

// Services imports
import GameService from './services/game.service';
import { RankedsComponent } from './views/rankeds/rankeds.component';
import { TutorialComponent } from './views/tutorial/tutorial.component';



@NgModule({
  declarations: [
    AppComponent,
    GroundComponent,
    BoardComponent,
    HomeComponent,
    StatusBarComponent,
    NewGameFormComponent,
    ButtonComponent,
    ModalComponent,
    BoardGameComponent,
    RankedsComponent,
    TutorialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({
      statusbar: statusBarReducer,
      modal: modalReducer,
      game: gameReducer
    }),
    FormsModule
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
