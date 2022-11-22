import React, {useState } from 'react';
import './deviceView.css'
import Device from '../../basic/element/device/Device'
import Form from '../../basic/element/form/Form';
import StateRadio from './stateRadio/StateRadio';
import { useParams } from 'react-router-dom';

import axios from 'axios';

function DeviceView(props) {
    let { deviceId } = useParams();
    const [ page, setPage ] = useState();

    createPage(setPage, deviceId)

    return page;
}

let isProcessed = false;
const createPage = async (setPage, deviceId) => {
    if (isProcessed) {
        return
    }
    isProcessed = true
    
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
    
    const config = { "Content-Type": 'application/json' };
    try {
        const response = await axios.get(`/api/device/${deviceId}`, config);
        console.log(response);
    } catch (error) {
        console.error(error);
        alert('불러오기 실패')
        isProcessing = false
        return
    }
    
    const page = (
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

    console.log(page)
    setPage(page)
}



export default DeviceView;