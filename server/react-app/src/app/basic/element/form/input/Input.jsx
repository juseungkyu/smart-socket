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
    const { label, type, name, value, readonly} = props;
    let { onChange } = props;

    if(!onChange){
        onChange = ()=>{}
    }

    const [inputValue, setInputValue] = useState(value);

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    let input = null

    if(type == 'hidden'){
        input = <input onChange={handleChange} type={type} value={inputValue} name={name} readOnly={readonly} />
    } else {
        input = (
            <div className='input-dom'>
                <p>{label}</p>
                <input onChange={(e)=>{handleChange(e); onChange(e);}} type={type} value={inputValue} name={name} readOnly={readonly} />
            </div>
        )
    }

    return input
}

export default Input;