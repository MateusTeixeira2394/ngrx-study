import { Component, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-game-form',
  templateUrl: './new-game-form.component.html',
  styleUrls: ['./new-game-form.component.css']
})
export class NewGameFormComponent {

  constructor(
    private router: Router
  ){};

  public goToHome(): void {
    this.router.navigate(['home']);
  }

}
