import './login.css'
import Form from '../../basic/element/form/Form';
import MemberContext from '../../../context/MemberContext';
import { useContext } from "react";
import Cookies from 'js-cookie';

function Login(props) {
    const {memberId, setMemberId} = useContext(MemberContext);

    const inputs = [
        {
            "label": 'id',
            "type": 'text',
            "name": 'memberId',
            "value": '',
            "readonly": false 
        },
        {
            "label": 'password',
            "type": 'text',
            "name": 'memberPw',
            "value": '',
            "readonly": false
        },
    ]

    const onLogin = (response)=>{
        console.log(response)
        setMemberId(Cookies.get('member_id'))
        alert('로그인 성공')
    }

    const action = "/api/member/login"
    const method = "post"
    return (
        <section>
            <div className="login container d-flex justify-center align-center">
                <Form
                    inputs={inputs}
                    action={action}
                    method={method}
                    callBack={onLogin}
                    successUrl='/'
                    title="로그인"
                ></Form>
            </div>
        </section>
    );
}

export default Login;