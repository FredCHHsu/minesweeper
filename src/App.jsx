import React, { useReducer } from 'react'

import reducer from './reducer'

import Board from './components/Board'

import './App.scss'

const initialState = {
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <div className="App">
      <Board />
    </div>
  )
}

export default App
