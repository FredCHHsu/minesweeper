import React from 'react'
import PropTypes from 'prop-types'

import './board.scss'

const Cell = ({ isRevealed, content, onClick }) => {
  return (
    <div
      className="board-cell"
      onClick={onClick}
    >
      {isRevealed ? content : ''}
    </div>
  )
}

Cell.propTypes = {
  isRevealed: PropTypes.bool,
  content: PropTypes.string,
  onClick: PropTypes.func,
}

export default Cell
