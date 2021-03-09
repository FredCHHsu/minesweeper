export const ACTIONS = {
  initialize: 'initialize',
  reveal: 'reveal',
}

export const initialize = (row = 10, col = 10, totalMines = 10) => ({
  type: ACTIONS.initialize,
  payload: {
    row,
    col,
    totalMines,
  },
})
