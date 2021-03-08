import ACTIONS from './actions'

export default function reducer(state, action) {
  const { type, payload } = action

  switch (type) {
    case ACTIONS.initialize:
      return {
        ...state,
        ...payload,
      }
    default:
      return state
  }
}
