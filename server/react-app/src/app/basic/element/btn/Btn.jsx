import React, {useState} from 'react';
import './btn.css'

/**
 * Btn 컴포넌트
 * @param {*} props 
 * @returns Btn
 */
function Btn(props) {
    const {onClick, children} = props

    return(
        <button className="btn" onClick={onClick ? onClick : null}>
            {children}
        </button>
    )
}

export default Btn;