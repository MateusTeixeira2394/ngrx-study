import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GroundComponent } from './components/ground/ground.component';
import { BoardComponent } from './components/board/board.component';
import { HomeComponent } from './views/home/home.component';
import { StatusBarComponent } from './components/status-bar/status-bar.component';
import { NewGameFormComponent } from './views/new-game-form/new-game-form.component';
import { ButtonComponent } from './components/button/button.component';
import { StoreModule } from '@ngrx/store';
import { statusBarReducer } from './tools/redux/reducers/status-bar.reducer';
@NgModule({
  declarations: [
    AppComponent,
    GroundComponent,
    BoardComponent,
    HomeComponent,
    StatusBarComponent,
    NewGameFormComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({statusbar: statusBarReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
