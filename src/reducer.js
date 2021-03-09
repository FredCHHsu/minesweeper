import { ACTIONS } from './actions'

const SYMBOL_MINES = '*'

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}

function createMap(row, col, totalMines) {
  const map = Array.from(Array(row), () => Array(col).fill(0))
  let minesCount = 0
  while (minesCount < totalMines) {
    const targetRow = getRandomInt(row)
    const targetCol = getRandomInt(col)
    if (map[targetRow][targetCol] !== SYMBOL_MINES) {
      map[targetRow][targetCol] = SYMBOL_MINES
      // loop neighbor
      for (let i = targetRow - 1; i <= targetRow + 1; i++) {
        for (let j = targetCol - 1; j <= targetCol + 1; j++) {
          const isOutOfMap = i < 0 || j < 0 || i >= row || j >= col
          if (isOutOfMap) continue

          const hasMines = map[i][j] === SYMBOL_MINES
          if (hasMines) continue

          map[i][j] += 1
        }
      }
      minesCount++
    }
  }
  return map
}

export default function reducer(state, action) {
  const { type, payload } = action

  switch (type) {
    case ACTIONS.initialize: {
      const { row, col, totalMines } = payload
      const map = createMap(row, col, totalMines)
      return {
        ...state,
        map,
      }
    }
    case ACTIONS.reveal: {
      const { row, col } = payload
      const content = state.map[row][col]
      console.log(`reveal ${row} ${col}: ${content}`)
      return state
    }
    default:
      return state
  }
}
