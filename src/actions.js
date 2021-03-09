export const ACTIONS = {
  initialize: 'initialize',
  reveal: 'reveal',
  reset: 'reset',
}

export const initialize = (row = 10, col = 10, totalMines = 10) => ({
  type: ACTIONS.initialize,
  payload: {
    row,
    col,
    totalMines,
  },
})

export const reveal = (row, col) => ({
  type: ACTIONS.reveal,
  payload: {
    row,
    col,
  },
})

export const reset = () => ({
  type: ACTIONS.reset,
})
