import React from 'react'
import PropTypes from 'prop-types'
import './score.scss'

const Score = props => (
  <div className={`scores-cont scores__${props.name}`}>
    <p className={`scores-cont__name ${props.name}-name`}>{props.name}</p>
    <p>
      <span className={`scores-cont__health ${props.name}-health`}>
        <span style={{ width: props.health + '%' }} />
      </span>
    </p>
  </div>
)

// TO DO: specify types
Score.propTypes = {
  name: PropTypes.any.isRequired,
  health: PropTypes.any.isRequired,
}

export default Score
