import React, { useCallback, useContext } from 'react'
import PropTypes from 'prop-types'

import { GameState } from '../App'
import ACTIONS from '../actions'
import Cell from './Cell'

import './board.scss'

const Board = ({ row = 10, col = 10, onReveal }) => {
  const { state, dispatch } = useContext(GameState)
  console.log(state)
  const handleReveal = useCallback((row, col) => () => {
    dispatch({
      type: ACTIONS.reveal,
      payload: { row, col },
    })
  }, [dispatch])

  return (
    <div className="board-base">
      {Array.from({ length: row }).map((_, i) => (
        <div key={`row-${i}`} className="board-row">
          {Array.from({ length: col }).map((__, j) => (
            <Cell
              key={`cell-${i}-${j}`}
              onClick={handleReveal(i, j)}
              isRevealed={false}
              content={''}
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
  onReveal: PropTypes.func,
}

export default Board
