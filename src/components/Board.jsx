import React, { useCallback, useContext } from 'react'
import PropTypes from 'prop-types'

import { GameState } from '../App'
import { ACTIONS } from '../actions'
import Cell from './Cell'

import './board.scss'

const Board = () => {
  const { state, dispatch } = useContext(GameState)

  const { board } = state

  const handleReveal = useCallback((row, col) => () => {
    dispatch({
      type: ACTIONS.reveal,
      payload: { row, col },
    })
  }, [dispatch])

  return (
    <div className="board-base">
    {board && board.map((row, i) => (
      <div key={`row-${i}`} className="board-row">
        {row.map((col, j) => (
          <Cell
            key={`cell-${i}-${j}`}
            onClick={handleReveal(i, j)}
            isRevealed={board[i][j].isRevealed}
            content={board[i][j].content}
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
