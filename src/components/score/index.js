import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './score.scss'

class Score extends Component {
  constructor(props) {
    super(props)
    this.state = {
      healthLevel: 'good'
    }
  }

  componentDidUpdate(prevProps) {
    if( this.props.health < prevProps.health && this.props.health < 30)
      return this.setState({ healthLevel: 'danger' })
    if( this.props.health < prevProps.health && this.props.health < 80 && this.props.health >= 30)
      return this.setState({ healthLevel: 'warn' })
    if(this.props.health > prevProps.health)
      return this.setState({ healthLevel: 'good' })
  }

  render() {
    const { name, health } = this.props
    return (
      <div className={`scores-cont scores__${name}`} >
        <p className={`scores-cont__name ${name}-name`}>{name}</p>
        <p>
          <span className={`scores-cont__health ${name}-health`}>
            <span className={this.state.healthLevel}
              style={{ width: health + '%' }} />
          </span>
        </p>
      </div>
    )
  }
}
// TO DO: specify types
Score.propTypes = {
  name: PropTypes.any.isRequired,
  health: PropTypes.number.isRequired,
}

export default Score
