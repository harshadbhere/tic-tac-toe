import React from 'react'
import './ResetBoard.css'

export const ResetBoard = ({onClick}) => {
  return (
    <button className='reset-btn' onClick={onClick}>Reset</button>
  )
}
