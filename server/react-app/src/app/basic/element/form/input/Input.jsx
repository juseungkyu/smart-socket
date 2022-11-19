import './input.css'
import React, { useState } from 'react';
/**
 * @param {
 *      "label": '',
 *      "type": 'text, number'
 *      "name": ''
 *      "value": ''
 *      "readonly": boolean: 
 * } props 
 * @returns Form
 */
function Input(props) {
    const { label, type, name, value, readonly } = props;

    const [inputValue, setInputValue] = useState(value);

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <div className='input-dom'>
            <p>{label}</p>
            <input onChange={handleChange} type={type} value={inputValue} name={name} readOnly={readonly} />
        </div>
    )
}

export default Input;