import React from 'react'
import PropTypes from 'prop-types'

import './boxer.scss'

class Boxer extends React.Component{
  static propTypes = {
    stopGame: PropTypes.func.isRequired,
    setPosition: PropTypes.func.isRequired,
    classText: PropTypes.string.isRequired,
    setHookDamage: PropTypes.func.isRequired,
    setJabDamage: PropTypes.func.isRequired,
    // TO DO: specify types after discovering what it shoud be
    leftPosition: PropTypes.any.isRequired,
    allowMoving: PropTypes.any.isRequired,
  }

  constructor(props){
    super(props)
    this.boxerMoves = this.boxerMoves.bind(this)
    this.state = {
      backgroundPosition: '',
      zIndex: '0',
      hookHand: true
    }
  }

  componentDidMount(){
    window.addEventListener('keydown', this.boxerMoves)
  }

  componentDidUpdate(){
    if(this.props.stopGame) window.removeEventListener('keydown', this.boxerMoves)
  }

  setMainBoxerStage(){
    this.setState({ backgroundPosition: '', zIndex: '0' })
  }

  move(toLeft) {
    const newPosition = toLeft ?
      parseInt(this.props.leftPosition) - 50 :
      parseInt(this.props.leftPosition) + 50
    this.props.setPosition(this.props.classText, newPosition)
    this.props.allowMoving ? this.setState({ backgroundPosition: '-584px 0' }) : this.setMainBoxerStage()
  }

  jab(){
    this.setState({ backgroundPosition: '-292px 0', zIndex: '1' })
    this.props.setJabDamage(this.props.classText, this.props.leftPosition)
  }

  hook(){
    let handSide = this.state.hookHand ? '-584px' : '-292px'

    this.setState({ backgroundPosition: `${handSide} -566px`, zIndex: '1', hookHand: !this.state.hookHand })
    this.props.setHookDamage(this.props.classText, this.props.leftPosition)
  }

  boxerMoves(e){
    const clickEventForMoves = (left, right, jab, hook) => {
      switch(e.keyCode){
        case left:
          this.move(true)
          break
        case right:
          this.move()
          break
        case jab: this.jab()
          break
        case hook: this.hook()
          break
        default:
          return
      }
    }

    this.props.classText == 'leftBoxer' ? clickEventForMoves(81, 87, 86, 66) : clickEventForMoves(37, 39, 98, 97)

    setTimeout(() => this.setMainBoxerStage(), 100)
  }

  render(){
    return(
      <div
        className={`boxer ${this.props.classText}`}
        style={{
          left: this.props.leftPosition,
          backgroundPosition: this.state.backgroundPosition,
          zIndex: this.state.zIndex
        }} />
    )
  }
}
export default Boxer
