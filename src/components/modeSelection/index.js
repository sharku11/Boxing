
/* eslint-disable react/jsx-no-bind */
import PropTypes from 'prop-types'
import React from 'react'

import './modeSelection.scss'

const ModeSelection = ({ onModeSelection }) => (
  <div className="modeSelection">
    <div className="modeSelection_header">Choose mode</div>
    <div className="item"
      onClick={() => {onModeSelection(1)}}>
      1 Player
    </div>
    <div className="item"
      onClick={() => {onModeSelection(2)}}>
      2 Players
    </div>
  </div>
)

ModeSelection.propTypes = {
  onModeSelection: PropTypes.func.isRequired,
}

export default ModeSelection
