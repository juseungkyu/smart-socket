import './join.css'
import Form from '../../basic/element/form/Form';

function Join(props) {
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

    const action = "/api/member/join"
    const method = "post"
    return (
        <section>
            <div className="join container d-flex justify-center align-center">
                <Form
                    inputs={inputs}
                    action={action}
                    method={method}
                    successUrl='/'
                    title="회원가입"
                ></Form>
            </div>
        </section>
    );
}

export default Join;