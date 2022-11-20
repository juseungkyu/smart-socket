import React from 'react';
import './deviceView.css'
import Device from '../../basic/element/device/Device'
import Form from '../../basic/element/form/Form';
import StateRadio from './stateRadio/StateRadio';
import { useParams } from 'react-router-dom';

function DeviceView(props) {
    let { deviceId } = useParams();

    const dumpData = {
        deviceId: '123124fg575',
        deviceName: '전등 콘센트',
        isConnect : 0,
        state: 1
    }

    const {
        deviceName,
        isConnect,
        state
    } = dumpData

    const inputs = [
        {
            "label": 'name',
            "type": 'text',
            "name": 'memberId',
            "value": deviceName,
            "readonly": false 
        },
        {
            "label": '',
            "type": 'hidden',
            "name": 'deviceId',
            "value": deviceId,
            "readonly": false 
        },
    ]

    const action = 'api/device/update'
    const method = 'POST'
    return (
        <section>
            <div className="deviceView gap-3 container d-flex flex-col align-center">
                <Device 
                    key={deviceId}
                    deviceId={deviceId}
                    deviceName={deviceName}
                    isConnect={isConnect}
                    state={state}
                />
                <Form
                    inputs={inputs}
                    action={action}
                    method={method}
                    title='수정'
                >
                    <StateRadio value={state}></StateRadio>
                </Form>
            </div>
        </section>
    );
}

export default DeviceView;