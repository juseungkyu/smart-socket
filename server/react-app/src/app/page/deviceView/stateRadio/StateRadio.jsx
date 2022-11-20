import './stateRadio.css'
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
function StateRadio(props) {
    const {value} = props;

    console.log(value)

    const [inputValue, setInputValue] = useState(value);

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <div className='state-radio'>
            <p>현재상태</p>
            <div className='d-flex mt-2'>
                <div className='radio-box'>
                    <p>켜짐</p>
                    <input onChange={handleChange} checked={inputValue=='1' ? true : false} type="radio" value='1' name="state"/>
                </div>
                <div>
                    <p>꺼짐</p>
                    <input onChange={handleChange} checked={inputValue=='0' ? true :false} type="radio" value='0' name="state"/>
                </div>
            </div>
        </div>
    )
}

export default StateRadio;