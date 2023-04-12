import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import Modal from 'src/app/models/modal.model';
import StatusBar from '../../models/status-bar.model';
import { setTitle } from '../../tools/redux/actions/status-bar.actions';
import { setModal, closeModal } from '../../tools/redux/actions/modal.actions'
import Game from 'src/app/models/game.model';
import difficultyStrategy from 'src/app/tools/strategies/difficulty.strategy';
import Difficulty from '../../models/difficulty.model';
import { setGame } from 'src/app/tools/redux/actions/game.actions';

@Component({
  selector: 'app-new-game-form',
  templateUrl: './new-game-form.component.html',
  styleUrls: ['./new-game-form.component.css']
})
export class NewGameFormComponent implements OnInit{

  public form!: FormGroup;

  private readonly modal: Modal = {
    opened: true,
    text: `Once you press the "start now" button below the timer will begin. How less the time you complete the game it's better!`,
    hasHeader: true,
    headerTitle: "Are you ready?",
    buttons: [
      {
        text: 'Start now',
        action: () => this.startGame()
      },
      {
        text: 'Cancel',
        action: () => this.store.dispatch(closeModal())
      }
    ]
  };

  constructor(
    private router: Router,
    private store: Store<{ statusbar: StatusBar, modal: Modal, game: Game }>,
    private fb: FormBuilder
  ) {
    this.store.dispatch(setTitle({ statusbar: { title: 'New game' } }));
  }
  
  ngOnInit(): void {
    
    this.form = this.fb.group({
      name: ['',[
        Validators.required,
        Validators.minLength(3)
      ]],
      difficulty: ['',[
        Validators.required
      ]]
    });

  };

  public goToHome(): void {
    this.router.navigate(['home']);
  }

  public submitForm(): void {

    if (this.form.valid) {
      this.store.dispatch(setModal({ modal: this.modal }));
    } else {
      if (this.form.controls['name']?.errors) {
        document.getElementById('input-name')?.focus();
      };

    };

  };

  private startGame(): void {

    var game: Game = this.getGameInfoFromDiff(this.getGameFromForm());
    
    this.store.dispatch(setGame({game})); 

    this.store.dispatch(closeModal());

    this.router.navigate(['board-game']);

  };

  private getGameFromForm(): Game {

    const { name, difficulty } = this.form.controls;

    return {
      player: name?.value || '',
      difficulty: difficulty?.value || '',
      time: 0,
      mines: 0,
      rowsNCols: 0
    }

  };

  private getGameInfoFromDiff(game: Game): Game {

    const difficulty: Difficulty | undefined = difficultyStrategy(game.difficulty);
    
    if (difficulty) {

      const { grounds, mines, rowsNCols } = difficulty;

      return { 
        ...game,
        grounds,
        mines,
        rowsNCols
      }

    };

    return game;

  };

}
