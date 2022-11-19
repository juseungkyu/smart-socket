import './form.css'
import Input from './input/Input';
import Btn from '../btn/Btn';

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
 *      "method" : GET or POST or DELETE or PUT,
 * } props 
 * @returns 
 */
function Form(props) {
    const { inputs, action, method, children } = props;

    return(
        <form className='form gap-3' action={action} method={method}>
            <h3>{children}</h3>
            {
                inputs.map((inputData)=>{
                    const {label, type, name, value, readonly} = inputData

                    return (
                        <Input
                            key={name}
                            label={label}
                            type={type}
                            name={name}
                            value={value}
                            readonly={readonly}
                        ></Input>
                    )
                })
            }
            <div className='w-100 d-flex justify-end mt-3'>
                <Btn>전송</Btn>
            </div>
        </form>
    )
}

export default Form;