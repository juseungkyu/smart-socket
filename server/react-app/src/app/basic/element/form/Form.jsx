import './form.css'
import Input from './input/Input';
import Btn from '../btn/Btn';
import { createBrowserHistory } from 'history'
import axios from 'axios';

const hisotry = createBrowserHistory()

/**
 * 
 * @param {
 *      "inputs" : {
 *          "label": '',
 *          "type": 'text, number'
 *          "name": ''
 *          "value": ''
 *          "readonly": '': 
 *      },
 *      "action" : url
 *      "method" : get or post or delete or put,
 * } props 
 * @returns 
 */
function Form(props) {
    const { title, inputs, action, method, children, successUrl } = props;

    const valueMap = {}
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

        const config = { "Content-Type": 'application/json' };

        try {
            const response = await axios[method](action, data, config);
            console.log(response);
            console.log(successUrl)
            hisotry.push(`${successUrl}`);
        } catch (error) {
            console.error(error);
            alert('실패')
            return
        }

        alert('성공')
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







