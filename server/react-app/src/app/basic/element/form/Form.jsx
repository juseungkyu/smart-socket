import './form.css'
import Input from './input/Input';
import Btn from '../btn/Btn';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

/**
 * Form 컴포넌트 
 * @param {
 *      "inputs" : {
 *          "label": '',
 *          "type": 'text, number'
 *          "name": ''
 *          "value": ''
 *          "callBack": ''
 *          "readonly": ''
 *          "createTime": date
 *          "onChange": function
 *      },
 *      "action" : url
 *      "method" : get or post or delete or put,
 * } props 
 * @returns Form
 */
function Form(props) {
    const navigate = useNavigate();
    const { title, inputs, action, method, children, successUrl, callBack } = props;

    console.log('inputs', inputs)

    const valueMap = {}

    // inputs를 input dom list로 변환
    const inputDoms = inputs.map((inputData) => {
        const { label, type, name, value, readonly } = inputData

        valueMap[name] = value

        const onChange = (e) => {
            valueMap[name] = e.target.value
        }

        const input = <Input
                key={name}
                label={label}
                type={type}
                name={name}
                value={value}
                readonly={readonly}
                createTime={new Date()}
                onChange={onChange}
            ></Input>
        console.log(name, value, input)

        return input
    })

    console.log('valueMap', valueMap)

    // 제출버튼 클릭 시 실행
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







