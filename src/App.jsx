import React, { useReducer, createContext, useEffect } from 'react'

import { initialize } from './actions'
import { reducer, initialState } from './reducer'

import Board from './components/Board'
import ControlPanel from './components/ControlPanel'

import './App.scss'

export const GameState = createContext()

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    dispatch(initialize(10, 10, 10))
  }, [])

  return (
    <div className="App">
      <GameState.Provider value={{ state, dispatch }}>
        <ControlPanel />
        <Board />
      </GameState.Provider>
    </div>
  )
}

export default App
