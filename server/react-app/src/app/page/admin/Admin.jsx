import './admin.css'
import Form from '../../basic/element/form/Form';
import MemberContext from '../../../context/MemberContext';
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

function Admin(props) {
    const navigate =  useNavigate();
    const [deviceId, setDeviceId]= useState('');
    const {memberId} = useContext(MemberContext);

    if(!memberId || memberId !== 'admin') {
        navigate(`${successUrl}`);
        return
    }

    const inputs = [
        {
            "label": 'Device Id',
            "type": 'text',
            "name": 'deviceId',
            "value": deviceId,
            "readonly": false 
        }
    ]

    const onCreateDevice = (response)=>{
        setDeviceId('')
        alert('디바이스 등록 성공')
    }

    const action = "/api/device/create"
    const method = "post"
    return (
        <section>
            <div className="device container d-flex justify-center align-center">
                <Form
                    inputs={inputs}
                    action={action}
                    method={method}
                    callBack={onCreateDevice}
                    successUrl='/admin'
                    title="디바이스 등록"
                ></Form>
            </div>
        </section>
    );
}

export default Admin;