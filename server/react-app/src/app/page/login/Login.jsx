import './login.css'
import Form from '../../basic/element/form/Form';

function Login(props) {
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

    const action = "/api/member/login"
    const method = "post"
    return (
        <section>
            <div className="login container d-flex justify-center align-center">
                <Form
                    inputs={inputs}
                    action={action}
                    method={method}
                    successUrl='/'
                    title="로그인"
                ></Form>
            </div>
        </section>
    );
}

export default Login;