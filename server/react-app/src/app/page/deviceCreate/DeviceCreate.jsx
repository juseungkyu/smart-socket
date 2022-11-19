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
    const method = "POST"
    return (
        <section>
            <div className="deviceCreate container d-flex justify-center align-center">
                <Form
                    inputs={inputs}
                    action={action}
                    method={method}
                >기기 등록하기</Form>
            </div>
        </section>
    );
}

export default DeviceCreate;