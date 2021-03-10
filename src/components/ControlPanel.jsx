import React, { useCallback, useContext } from 'react'
import clsx from 'clsx'

import { GameState } from '../App'
import { reset } from '../actions'

import './ControlPanel.scss'

const ControlPanel = props => {
  const { state, dispatch } = useContext(GameState)
  const { isGameOver, isWin } = state

  const handleReset = useCallback(() => {
    dispatch(reset())
  }, [dispatch])

  return (
    <div className="control-panel">
      <div className={clsx('game-status', {
        '-win': isWin,
      })}
      >
        {isGameOver && (
          isWin
            ? 'You Win!'
            : 'Game Over'
        )}
      </div>
      <button
        className="reset-button"
        onClick={handleReset}
      >
        Try again
      </button>
    </div>
  )
}

ControlPanel.propTypes = {

}

export default ControlPanel
