import ACTIONS from './actions'

export default function reducer(state, action) {
  const { type, payload } = action

  switch (type) {
    case ACTIONS.initialize:
      return state
    case ACTIONS.reveal: {
      const { type, payload: { row, col } } = action
      console.log(`reveal ${row} ${col}`)
      return state
    }
    default:
      return state
  }
}
