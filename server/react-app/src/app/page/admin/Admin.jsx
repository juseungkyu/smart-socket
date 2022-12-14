import './admin.css'
import Form from '../../basic/element/form/Form';
import MemberContext from '../../../context/MemberContext';
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * 관리자 페이지 (등록가능 디바이스 생성)
 * @param {*} props 
 * @returns admin page
 */
function Admin(props) {
    const navigate =  useNavigate();
    const [deviceId, setDeviceId]= useState('');
    const {memberId, isAdmin} = useContext(MemberContext);

    console.log(memberId, isAdmin, typeof isAdmin)

    // 관리자인지 확인
    if(isAdmin === '0') {
        alert('관리자만 접속 가능 합니다.');
        navigate('/');
        console.log('실행')
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
        alert('디바이스 생성 성공')
    }

    const action = "/api/admin/create"
    const method = "post"

    return (
        <section>
            <div className="adminpage container d-flex justify-center align-center">
                <Form
                    inputs={inputs}
                    action={action}
                    method={method}
                    callBack={onCreateDevice}
                    successUrl='/admin'
                    title="등록 가능 디바이스 생성"
                ></Form>
            </div>
        </section>
    );
}

export default Admin;