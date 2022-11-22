import './deviceCreate.css'
import Form from '../../basic/element/form/Form';

function DeviceCreate(props) {
    const inputs = [
        {
            "label": 'device id',
            "type": 'text',
            "name": 'deviceId',
            "value": '',
            "readonly": false 
        },
        {
            "label": 'name',
            "type": 'text',
            "name": 'deviceName',
            "value": '',
            "readonly": false
        },
    ]

    const action = "/api/device/create"
    const method = "post"

    return (
        <section>
            <div className="deviceCreate container d-flex justify-center align-center">
                <Form
                    inputs={inputs}
                    action={action}
                    method={method}
                    callBack={onCreate}
                    successUrl='/'
                    title="기기 등록하기"
                ></Form>
            </div>
        </section>
    );
}

function onCreate(res) {
    alert('등록 되었습니다.')
}

export default DeviceCreate;