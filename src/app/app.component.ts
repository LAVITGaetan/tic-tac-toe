import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tic-tac-toe';

  gameState = {
    started: false,
    turn: 'player',
    round_count: 0,
    player_score: 0,
    cpu_score: 0,
  }

  modal = {
    show : false,
    winner : ''
  }

  cells = [
    {
      id: 0,
      image_url: './assets/frontend/',
      selected: false,
      owner : ''
    },
    {
      id: 1,
      image_url: './assets/frontend/',
      selected: false,
      owner : ''
    },
    {
      id: 2,
      image_url: './assets/frontend/',
      selected: false,
      owner : ''
    },
    {
      id: 3,
      image_url: './assets/frontend/',
      selected: false
    },
    {
      id: 4,
      image_url: './assets/frontend/',
      selected: false
    },
    {
      id: 5,
      image_url: './assets/frontend/',
      selected: false,
      owner : ''
    },
    {
      id: 6,
      image_url: './assets/frontend/',
      selected: false,
      owner : ''
    },
    {
      id: 7,
      image_url: './assets/frontend/',
      selected: false,
      owner : ''
    },
    {
      id: 8,
      image_url: './assets/frontend/',
      selected: false,
      owner : ''
    },
  ]

  handleCellClick(event: any) {
    let cell = this.cells[event.target.value]
    cell.selected = true
    cell.owner = this.gameState.turn
    if(this.gameState.turn === 'player') {
      cell.image_url += 'circle.svg'

    } else {
      cell.image_url += 'cross.svg'

    }
    event.target.disabled = true
    event.target.classList.add(`${this.gameState.turn}-selected-cell`);
    this.gameState.round_count += 1
    let turn = this.gameState.turn
    turn === 'player' ? this.gameState.turn = 'cpu' : this.gameState.turn = 'player'
    this.checkWinner()
  }

  resetGame() {
    this.gameState.started = false
    this.gameState.turn = 'player'
    this.gameState.round_count = 0
    let array = document.getElementsByClassName('board-cell')
    this.cells.map(el =>  {
      el.selected = false
      el.image_url = './assets/frontend/'
      el.owner = ''
    }
    )
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      element.removeAttribute('disabled')
    }
  }

  checkWinner() {
    
    if(this.gameState.round_count > 4) {
      let winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [0, 4, 8],
    ];

    let playerArray = this.cells.filter(el => el.owner === 'player').map(el => {
      return el.id
    });
    let cpuArray = this.cells.filter(el => el.owner === 'cpu').map(el => {
      return el.id
    });

    for (let i = 0; i < winConditions.length; i++) {
      const element = winConditions[i];
      let checkedValues = 0
      if(playerArray.filter(el => el == element[0]).length > 0) {
        checkedValues += 1
      }
      if(playerArray.filter(el => el == element[1]).length > 0) {
        checkedValues += 1
      }
      if(playerArray.filter(el => el == element[2]).length > 0) {
        checkedValues += 1
      }
      if(checkedValues == 3) {
        this.showWinner('player')
        this.gameState.player_score += 1
        return
      }
    }
    for (let i = 0; i < winConditions.length; i++) {
      const element = winConditions[i];
      let checkedValues = 0
      if(cpuArray.filter(el => el == element[0]).length > 0) {
        checkedValues += 1
      }
      if(cpuArray.filter(el => el == element[1]).length > 0) {
        checkedValues += 1
      }
      if(cpuArray.filter(el => el == element[2]).length > 0) {
        checkedValues += 1
      }
      if(checkedValues == 3) {
        this.showWinner('cpu')

        this.gameState.cpu_score += 1
        return
      }
    }
    if(this.gameState.round_count == 9) {
      this.showEquality()
      this.gameState.cpu_score += 1
      this.gameState.player_score += 1
    }
    }
    
  }

  showWinner(winner : string) {

    this.modal.winner = winner
    this.modal.show = true
  }

  showEquality() {
    this.modal.show = true
  }
}
