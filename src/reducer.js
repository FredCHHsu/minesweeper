import { ACTIONS } from './actions'

export const SYMBOL_MINES = 'X'

export const initialState = {
  board: null,
  isGameOver: false,
  isWin: false,
  revealedCount: 0,
  row: undefined,
  col: undefined,
  totalMines: undefined,
  totalCell: undefined,
}

export function reducer(state, action) {
  const { type, payload } = action

  switch (type) {
    case ACTIONS.initialize: {
      const { row, col, totalMines } = payload
      const board = createBoard(row, col, totalMines)
      return {
        ...initialState,
        board,
        row,
        col,
        totalMines,
        totalCell: row * col,
      }
    }
    case ACTIONS.reveal: {
      const { row, col } = payload
      const { board, revealedCount, totalMines, totalCell } = state

      let nextBoard = JSON.parse(JSON.stringify(board))

      // first click never been mines
      if (revealedCount === 0) {
        while (nextBoard[row][col].content === SYMBOL_MINES) {
          nextBoard = createBoard(state.row, state.col, totalMines)
        }
      }

      // reveal
      nextBoard[row][col].isRevealed = true
      let nextRevealedCount = revealedCount + 1

      // no adjacent mine, loop neighbors
      if (nextBoard[row][col].content === 0) {
        nextRevealedCount += revealNeighbors(nextBoard, row, col)
      }

      // check loss
      if (nextBoard[row][col].content === SYMBOL_MINES) {
        console.log('Loss')
        return {
          ...state,
          board: nextBoard,
          revealedCount: nextRevealedCount,
          isGameOver: true,
        }
      }

      // check win
      if (nextRevealedCount + totalMines === totalCell) {
        console.log('Win')
        return {
          ...state,
          board: nextBoard,
          revealedCount: nextRevealedCount,
          isGameOver: true,
          isWin: true,
        }
      }

      return {
        ...state,
        board: nextBoard,
        revealedCount: nextRevealedCount,
      }
    }
    case ACTIONS.reset: {
      const { row, col, totalMines } = state
      const board = createBoard(row, col, totalMines)
      return {
        ...state,
        board,
        isGameOver: false,
        isWin: false,
        revealedCount: 0,
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

function revealNeighbors(board, row, col) {
  let count = 0
  const boardRow = board.length
  const boardCol = board[0].length
  for (let i = row - 1; i <= row + 1; i++) {
    for (let j = col - 1; j <= col + 1; j++) {
      const isOutOfBoard = i < 0 || j < 0 || i >= boardRow || j >= boardCol
      if (isOutOfBoard) continue
      if (!board[i][j].isRevealed) {
        board[i][j].isRevealed = true
        count++
      }
    }
  }
  return count
}
