import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import './board.scss'

const Cell = ({ isRevealed, content, onClick }) => {
  return (
    <div
      className={clsx('board-cell', {
        '-revealed': isRevealed,
      })}
      onClick={onClick}
    >
      {isRevealed ? content : ''}
    </div>
  )
}

Cell.propTypes = {
  isRevealed: PropTypes.bool,
  content: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onClick: PropTypes.func,
}

export default Cell
