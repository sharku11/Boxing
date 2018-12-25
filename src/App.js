import React, { Component } from 'react'
import { first } from 'lodash'

import './App.scss'
import Score from './components/score'
import Boxer from './components/boxer'
import { damage, initialState } from './config'
import ModeSelection from './components/modeSelection'
import { initialPositions as IP, boxersId as ID } from './constants'

class App extends Component {
  constructor(props){
    super(props)
    this.state = initialState
    this.moveLeft = this.moveLeft.bind(this)
    this.moveRight = this.moveRight.bind(this)
    this.rematch = this.rematch.bind(this)
    this.checkDamage = this.checkDamage.bind(this)
    this.onModeSelection = this.onModeSelection.bind(this)
  }

  _allowLeftMoving(boxerId) {
    if(this.state.winner) return false
    if(boxerId === ID.LEFT) {
      if(this.state.leftBoxerPosition > IP.leftBoxer) return true
    } else if (boxerId === ID.RIGHT) {
      if(this.state.rightBoxerPosition > this.state.leftBoxerPosition) return true
    }
    return false
  }

  _allowRightMoving(boxerId) {
    if(this.state.winner) return false
    if(boxerId === ID.LEFT) {
      if(this.state.leftBoxerPosition < this.state.rightBoxerPosition)
        return true
    } else if (boxerId === ID.RIGHT) {
      if (this.state.rightBoxerPosition < IP.rightBoxer)
        return true
    }
    return false
  }

  _checkWinner() {
    this.state.leftBoxerHealth <= 0 ?
      this.setState({ winner: 'Right Boxer' }) :
      this.state.rightBoxerHealth <= 0 ?
        this.setState({ winner: 'Left Boxer' }) : this.setState({ winner: null })
  }

  checkDamage(boxerId, hitType) {
    if(this.state.rightBoxerPosition - this.state.leftBoxerPosition > 50)
      return
    const oppositId = first(Object.values(ID).filter(id => id !== boxerId))
    this.setState({ [`${oppositId}Health`]: this.state[`${oppositId}Health`] - damage[hitType] })
    this._checkWinner()
  }

  onModeSelection(mode) {
    this.setState({ mode })
  }

  moveRight(boxerId) {
    if(this._allowRightMoving(boxerId)) {
      this.setState({ [`${boxerId}Position`]: this.state[`${boxerId}Position`] + 50 })
    }
  }

  moveLeft(boxerId) {
    if(this._allowLeftMoving(boxerId)) {
      this.setState({ [`${boxerId}Position`]: this.state[`${boxerId}Position`] - 50 })
    }
  }

  rematch() {
    if(this.state.winner) {
      this.setState(initialState)
    }
  }

  render(){
    return (
      <div className="wrapper"
        onClick={this.rematch}>
        <div className="ring">
          <div className="ring-inner" />
          {this.state.mode === 0 ? <ModeSelection onModeSelection={this.onModeSelection} /> : null}
          <Score health={this.state.leftBoxerHealth}
            name="left" />
          <Score health={this.state.rightBoxerHealth}
            name="right" />
          <div className="speaker">
            {this.state.winner ? <>
              {this.state.winner} wins
              <p className="rematch-message">Click anywhere to rematch</p>
            </> : ''}
          </div>
          <Boxer
            allowAction={!this.state.winner}
            checkDamage={this.checkDamage}
            id={ID.LEFT}
            moveLeft={this.moveLeft}
            moveRight={this.moveRight}
            position={this.state.leftBoxerPosition} />
          <Boxer
            allowAction={!this.state.winner}
            checkDamage={this.checkDamage}
            controlsByComputer={this.state.mode === 1}
            id={ID.RIGHT}
            moveLeft={this.moveLeft}
            moveRight={this.moveRight}
            position={this.state.rightBoxerPosition} />
        </div>
      </div>
    )
  }
}

export default App
