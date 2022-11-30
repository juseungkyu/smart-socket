import './input.css'
import React, { useState, forwardRef, useEffect } from 'react';

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
function Input(props){
    const { label, type, name, readonly, value, createTime} = props;
    let { onChange } = props;
    const [inputValue, setInputValue] = useState(value)

    useEffect(()=>{
        setInputValue(value)
    }, [createTime])

    if(!onChange){
        onChange = ()=>{}
    }

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