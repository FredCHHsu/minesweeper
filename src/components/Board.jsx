import React, { useCallback } from 'react'
import PropTypes from 'prop-types'

import Cell from './Cell'

import './game.scss'

const Board = ({ row = 10, col = 10 }) => {
  const handleReveal = useCallback((row, col) => () => {
    console.log(`reveal ${row} ${col}`)
  }, [])

  return (
    <div className="board-base">
      {Array.from({ length: row }).map((_, i) => (
        <div key={`row-${i}`} className="board-row">
          {Array.from({ length: col }).map((__, j) => (
            <Cell
              key={`cell-${i}-${j}`}
              onClick={handleReveal(i, j)}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

Board.propTypes = {
  row: PropTypes.number,
  col: PropTypes.number,
}

export default Board
