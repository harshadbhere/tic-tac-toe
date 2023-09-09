import React from 'react'
import './Selector.css'

export const Selector = ({selected, onClick}) => {
  return (
    <div>
        <button onClick={()=> onClick("X")} className={selected==="X"?"selected btn": "btn"}>{selected==="X"?"Playing as X": "Play as X"}</button>
        <button onClick={()=> onClick("O")}  className={selected==="O"?"selected btn": "btn"}>{selected==="O"?"Playing as O": "Play as O"}</button>
    </div>
  )
}
