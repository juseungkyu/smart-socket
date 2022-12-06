import './join.css'
import Form from '../../basic/element/form/Form';

/**
 * 회원가입 페이지
 * @param {*} props 
 * @returns join page
 */
function Join(props) {

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

    const action = "/api/member/join"
    const method = "post"
    return (
        <section>
            <div className="join container d-flex justify-center align-center">
                <Form
                    inputs={inputs}
                    action={action}
                    method={method}
                    callBack={onJoin}
                    successUrl='/login'
                    title="회원가입"
                ></Form>
            </div>
        </section>
    );
}

// 회원 가입 성공 시 수행
function onJoin(res) {
    alert('회원가입 성공')
}

export default Join;