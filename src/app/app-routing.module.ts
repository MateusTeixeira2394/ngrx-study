import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { NewGameFormComponent } from './views/new-game-form/new-game-form.component';
import { BoardGameComponent } from './views/board-game/board-game.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'new-game',
    component: NewGameFormComponent
  },
  {
    path: 'board-game',
    component: BoardGameComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
