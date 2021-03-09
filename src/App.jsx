import React, { useReducer, createContext, useEffect } from 'react'

import { initialize } from './actions'
import reducer from './reducer'

import Board from './components/Board'

import './App.scss'

const initialState = {
  board: null,
}

export const GameState = createContext()

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    dispatch(initialize(10, 10, 10))
  }, [])

  return (
    <div className="App">
      <GameState.Provider value={{ state, dispatch }}>
        <Board />
      </GameState.Provider>
    </div>
  )
}

export default App
