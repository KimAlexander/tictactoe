'use strict'

class TicTacToe {
  constructor() {
    this.STEP = 3;
    this.state = null;
    this.lastSaveStep = null;
    this.isWinner = false

    this._getLocalStorageState();
    if (this.state) {
      this.state = Object.values(this.state);
    }
  } 

  _getLocalStorageState() {
    this.state = JSON.parse(window.localStorage.getItem('grid'));
    this.lastSaveStep = window.localStorage.getItem('lastSaveStep');
    this.isWinner = window.localStorage.getItem('isWinner');
  }

  _updateState(type) {
    window.localStorage.setItem('grid', JSON.stringify(this.state));
    window.localStorage.setItem('lastSaveStep', type);
  }

  _isWinner() {
    for(let y = 0; y < this.STEP; y++) {
      if (this.state[y][0].length &&
          this.state[y][0] === this.state[y][1] &&
          this.state[y][0] === this.state[y][2]) {
        console.log(`winner is ${this.state[y][0]}`)
        return true
      }
    }

    for(let x = 0; x < this.STEP; x++) {
      if (this.state[0][x].length &&
          this.state[0][x] === this.state[1][x] &&
          this.state[0][x] === this.state[2][x]) {
        console.log(`winner is ${this.state[0][x]}`)
        return true
      }
    }
  
    // diagonal test
    if (this.state[0][0].length &&
        this.state[0][0] === this.state[1][1] &&
        this.state[0][0] === this.state[2][2]) {
      console.log(`winner is ${this.state[0][0]}`)
      return true
    }

    if (this.state[2][0].length &&
        this.state[2][0] === this.state[1][1] &&
        this.state[2][0] === this.state[0][2]) {
      console.log(`winner is ${this.state[2][0]}`)
      return true
    }
  }

  _isErrors(cellX, cellY, currentPlayType) {
    if (this.isWinner) {
      console.log(`The game is done start a new one!`);
      return true
    }

    if (['x', 'o'].indexOf(currentPlayType) === -1 || !currentPlayType.length) {
      console.log(`invalid param ${currentPlayType} only allow x or o`)
      return true
    }

    if (!this.lastSaveStep && currentPlayType !== 'x') {
      console.log(`x is starting first`);
      return true
    }

    if (this.state[cellX][cellY].length) {
      console.log(`cell already been set by prev user`);
      return true
    }

    if (this.lastSaveStep && this.lastSaveStep === currentPlayType) {
      console.log(`<${currentPlayType}> it's another player's pitch. Or start a new game`)
      return true
    }
  }

  begin() {
    localStorage.clear();
    this.state = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
    this.lastSaveStep = null;
    this.isWinner = false;
  }

  makePitch(cellX, cellY, type) {
    if (this._isErrors(cellX, cellY, type)) {
     return
    };

    this.state[cellX][cellY] = type;
    this.lastSaveStep = type
    this._updateState(type); 
    this.printState();

    if (this._isWinner()) {
      this.isWinner = true;
      window.localStorage.setItem('isWinner', true);
    }
  }

  printState() {
    this.state.forEach((i) => {
      console.log(i);
    })
  }

  exit() {
    this.begin();
    console.log('you exit the game')
  }

  about() {
    console.log('Tic tac toe game by Alexander')
  }
}

var ticTacToe = new TicTacToe()