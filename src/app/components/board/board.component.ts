import { Component, Input, OnInit } from '@angular/core';
import Ground from 'src/app/models/ground.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit{

  @Input()
  public grounds: Ground[] = [
    {
      known: false,
      isMine: false,
      minesAround: 0
    },
    {
      known: false,
      isMine: false,
      minesAround: 0
    },
    {
      known: false,
      isMine: false,
      minesAround: 0
    },
    {
      known: false,
      isMine: false,
      minesAround: 0
    },
    {
      known: false,
      isMine: false,
      minesAround: 0
    }
  ];

  @Input()
  public size: number = 10;

  public rows: Ground[][] = [];

  ngOnInit(): void {
    
    this.rows = this.getRows(this.grounds);
    console.log(this.rows)
  };

  private getRows(grounds: Ground[], size: number=10): Ground[][] {

    let rows: Ground[][] = [];

    for (let i = 0; i < grounds.length; i=+size) {
        rows.push(grounds.slice(i,i+size));
    }

    return rows;

  };

}
