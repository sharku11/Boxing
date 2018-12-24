import React from 'react'
import PropTypes from 'prop-types'

import './boxer.scss'
import { movementPositions, hitTypes } from '../../constants'
import { controls as C } from '../../config'
class Boxer extends React.Component{
  static propTypes = {
    allowAction: PropTypes.bool,
    id: PropTypes.string.isRequired,
    position: PropTypes.number.isRequired,
    moveLeft: PropTypes.func.isRequired,
    moveRight: PropTypes.func.isRequired,
    checkDamage: PropTypes.func.isRequired,
  }

  static defaultProps = {
    allowAction: true,
  }

  constructor(props) {
    super(props)
    this.state = {
      image: movementPositions.initialPosition
    }
  }

  componentDidMount() {
    const { id } = this.props
    const codes = C[id]
    window.addEventListener('keydown', ev => {
      //eslint-disable-next-line no-console
      console.log(ev.keyCode)
      switch(ev.keyCode) {
        case codes.left:
          this.animateMoving()
          this.props.moveLeft(id)
          break
        case codes.right:
          this.animateMoving()
          this.props.moveRight(id)
          break
        case codes[hitTypes.jab]:
          this.hit(id, hitTypes.jab)
          break
        case codes[hitTypes.hook]:
          this.hit(id, hitTypes.hook)
          break
        default:
          return
      }
    })
  }

  animateMoving() {
    if(!this.props.allowAction) return
    this.setState({ image: movementPositions.moving })
    setTimeout(() => {
      this.setState({ image: movementPositions.initialPosition })
    }, 100)
  }

  hit(id, hitType) {
    if(!this.props.allowAction) return
    this.setState({ image: movementPositions[hitType] })
    setTimeout(() => {
      this.setState({ image: movementPositions.initialPosition })
    }, 100)
    this.props.checkDamage(id, hitType)
  }

  render(){
    return(
      <div
        className={`boxer ${this.props.id}`}
        style={{
          left: this.props.position,
          ...this.state.image,
        }} />
    )
  }
}
export default Boxer
