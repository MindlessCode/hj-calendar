import React from 'react'
import './ExpBar.css'

const ExpBar = ({exp1}) => {
    return (
        <div className="exp-bar-2">
            <div className="exp-bar-1" style={{width: `${exp1}%`}}></div>
        </div>
    )
}

export default ExpBar
