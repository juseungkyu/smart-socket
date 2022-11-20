import React, {useState} from 'react';
import './btn.css'

function Btn(props) {
    const {onClick, children} = props

    return(
        <button className="btn" onClick={onClick ? onClick : null}>
            {children}
        </button>
    )
}

export default Btn;