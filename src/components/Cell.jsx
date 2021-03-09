import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import { SYMBOL_MINES } from '../reducer'

import './board.scss'

const Cell = ({ isRevealed, content, onClick }) => {
  return (
    <div
      className={clsx('board-cell', {
        '-revealed': isRevealed,
        '-has-mines': content === SYMBOL_MINES,
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
