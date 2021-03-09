import { ACTIONS } from './actions'

export const SYMBOL_MINES = 'X'

export const initialState = {
  board: null,
  isGameOver: false,
  isWin: false,
  revealedCount: 0,
  totalCell: 0,
}

export function reducer(state, action) {
  const { type, payload } = action

  switch (type) {
    case ACTIONS.initialize: {
      const { row, col, totalMines } = payload
      const board = createBoard(row, col, totalMines)
      return {
        ...state,
        board,
        totalMines,
        totalCell: row * col,
      }
    }
    case ACTIONS.reveal: {
      const { row, col } = payload
      const { board, revealedCount, totalMines, totalCell } = state
      board[row][col].isRevealed = true
      const nextRevealedCount = revealedCount + 1

      // check loss
      if (board[row][col].content === SYMBOL_MINES) {
        console.log('Loss')
        return {
          ...state,
          board,
          revealedCount: nextRevealedCount,
          isGameOver: true,
        }
      }

      // check win
      if (nextRevealedCount + totalMines === totalCell) {
        console.log('Win')
        return {
          ...state,
          board,
          revealedCount: nextRevealedCount,
          isGameOver: true,
          isWin: true,
        }
      }

      return {
        ...state,
        board,
        revealedCount: nextRevealedCount,
      }
    }
    default:
      return state
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}

function createBoard(row, col, totalMines) {
  const board = Array.from(
    { length: row },
    () => Array.from(
      { length: col },
      () => ({
        isRevealed: false,
        content: 0,
      }),
    ))

  let minesCount = 0
  while (minesCount < totalMines) {
    const targetRow = getRandomInt(row)
    const targetCol = getRandomInt(col)
    if (board[targetRow][targetCol].content !== SYMBOL_MINES) {
      // set mines
      board[targetRow][targetCol].content = SYMBOL_MINES
      minesCount++

      // loop neighbor number
      for (let i = targetRow - 1; i <= targetRow + 1; i++) {
        for (let j = targetCol - 1; j <= targetCol + 1; j++) {
          const isOutOfBoard = i < 0 || j < 0 || i >= row || j >= col
          if (isOutOfBoard) continue

          const hasMines = board[i][j].content === SYMBOL_MINES
          if (hasMines) continue

          board[i][j].content += 1
        }
      }
    }
  }
  return board
}
