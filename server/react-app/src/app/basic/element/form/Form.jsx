import './form.css'
import Input from './input/Input';
import Btn from '../btn/Btn';
import axios from 'axios';
import { useImperativeHandle } from 'react';
import { useNavigate } from "react-router-dom";

/**
 * 
 * @param {
 *      "inputs" : {
 *          "label": '',
 *          "type": 'text, number'
 *          "name": ''
 *          "value": ''
 *          "callBack": ''
 *          "readonly": ''
 *      },
 *      "action" : url
 *      "method" : get or post or delete or put,
 * } props 
 * @returns 
 */
function Form(props, ref) {
    const navigate = useNavigate();
    const { title, inputs, action, method, children, successUrl, callBack } = props;

    const valueMap = {}

    console.log(ref)

    // ref.current.changeValue = changeValue = (key, value) => {
    //     valueMap[key] = value
    // }

    const inputDoms = inputs.map((inputData) => {
        const { label, type, name, value, readonly } = inputData

        valueMap[name] = value

        const onChange = (e) => {
            valueMap[name] = e.target.value
        }

        return (
            <Input
                key={name}
                label={label}
                type={type}
                name={name}
                value={value}
                readonly={readonly}
                onChange={onChange}
            ></Input>
        )
    })

    let isProcessing = false
    const onSubmit = async () => {
        if (isProcessing) {
            return
        }
        isProcessing = true

        const valueKeys = Object.keys(valueMap)
        const data = {}
        valueKeys.forEach(x => {
            data[x] = valueMap[x]
        })

        console.log(data)

        const config = { "Content-Type": 'application/json' };

        try {
            const response = await axios[method](action, data, config);
            console.log(response);
            navigate(`${successUrl}`);
            callBack(response)
        } catch (error) {
            console.error(error);
            alert(error.response.data.data.message)
            isProcessing = false
            return
        }

        isProcessing = false
    }

    return (
        <div className='form gap-3' action={action} method={method}>
            <h3>{title}</h3>
            {inputDoms}
            {children}
            <div className='w-100 d-flex justify-end mt-3'>
                <Btn
                    onClick={onSubmit}
                >전송</Btn>
            </div>
        </div>
    )
}

export default Form;







