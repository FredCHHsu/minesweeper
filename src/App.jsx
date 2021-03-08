import React, { useReducer, createContext, useContext } from 'react'

import reducer from './reducer'

import Board from './components/Board'

import './App.scss'

const initialState = {
}

export const GameState = createContext()

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <div className="App">
      <GameState.Provider value={{ state, dispatch }}>
        <Board />
      </GameState.Provider>
    </div>
  )
}

export default App
