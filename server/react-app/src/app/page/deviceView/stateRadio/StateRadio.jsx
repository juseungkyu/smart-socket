import './stateRadio.css'
import React, { useState } from 'react';
/**
 * 디바이스 상태 radio 버튼
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
    const {value, onChange} = props;

    console.log(value)

    const [inputValue, setInputValue] = useState(value);

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    // onChange를 이용해 상위 컴포넌트에 변경된 값 전달
    return (
        <div className='state-radio'>
            <p>현재상태</p>
            <div className='d-flex mt-2'>
                <div className='radio-box'>
                    <p>켜짐</p>
                    <input onChange={(e)=>{handleChange(e); onChange(e)}} checked={inputValue=='1' ? true : false} type="radio" value='1' name="state"/>
                </div>
                <div>
                    <p>꺼짐</p>
                    <input onChange={(e)=>{handleChange(e); onChange(e)}} checked={inputValue=='0' ? true :false} type="radio" value='0' name="state"/>
                </div>
            </div>
        </div>
    )
}

export default StateRadio;