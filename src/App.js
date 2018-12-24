import React, { Component } from 'react'
import { first } from 'lodash'

import './App.scss'
import Score from './components/score'
import Boxer from './components/boxer'
import { damage } from './config'
import { initialPositions as IP, boxersId as ID } from './constants'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      leftBoxerHealth: 100,
      rightBoxerHealth: 100,
      leftBoxerPosition: IP.leftBoxer,
      rightBoxerPosition: IP.rightBoxer,
      winner: null,
    }
    this.moveLeft = this.moveLeft.bind(this)
    this.moveRight = this.moveRight.bind(this)
    this.rematch = this.rematch.bind(this)
    this.checkDamage = this.checkDamage.bind(this)
  }

  rematch() {
    if(this.state.winner) {
      this.setState({
        leftBoxerHealth: 100,
        rightBoxerHealth: 100,
        leftBoxerPosition: IP.leftBoxer,
        rightBoxerPosition: IP.rightBoxer,
        winner: null,
      })
    }
  }

  checkWinner() {
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
    this.checkWinner()
  }

  allowLeftMoving(boxerId) {
    if(this.state.winner) return false
    if(boxerId === ID.LEFT) {
      if(this.state.leftBoxerPosition > IP.leftBoxer) return true
    } else if (boxerId === ID.RIGHT) {
      if(this.state.rightBoxerPosition > this.state.leftBoxerPosition) return true
    }
    return false
  }

  allowRightMoving(boxerId) {
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

  moveLeft(boxerId) {
    if(this.allowLeftMoving(boxerId)) {
      this.setState({ [`${boxerId}Position`]: this.state[`${boxerId}Position`] - 50 })
    }
  }

  moveRight(boxerId) {
    if(this.allowRightMoving(boxerId)) {
      this.setState({ [`${boxerId}Position`]: this.state[`${boxerId}Position`] + 50 })
    }
  }

  render(){
    return (
      <div className="wrapper"
        onClick={this.rematch}>
        <div className="ring">
          <div className="ring-inner" />
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
