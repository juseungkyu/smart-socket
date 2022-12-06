import './login.css'
import Form from '../../basic/element/form/Form';
import MemberContext from '../../../context/MemberContext';
import { useContext } from "react";
import Cookies from 'js-cookie';

/**
 * 로그인 페이지
 * @param {*} props 
 * @returns login page
 */
function Login(props) {
    const {memberId, setMemberId, setIsAdmin} = useContext(MemberContext);

    // form에 보여줄 input list
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

    // 로그인 성공 시 세션 정보 다시 받기
    const onLogin = (response)=>{
        console.log(response)
        setIsAdmin(Cookies.get('is_admin'))
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