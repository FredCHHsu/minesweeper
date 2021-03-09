import React, { useCallback, useContext } from 'react'
import PropTypes from 'prop-types'

import { GameState } from '../App'
import { reveal } from '../actions'

import Cell from './Cell'

import './board.scss'

const Board = () => {
  const { state, dispatch } = useContext(GameState)

  const { board, isGameOver } = state

  const handleReveal = useCallback((row, col) => () => {
    if (board[row][col].isRevealed) return
    if (isGameOver) return
    dispatch(reveal(row, col))
  }, [dispatch, board, isGameOver])

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
