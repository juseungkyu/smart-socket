import React, { useState, useEffect } from 'react';
import './deviceView.css'
import { useParams } from 'react-router-dom';
import Device from '../../basic/element/device/Device';
import Form from '../../basic/element/form/Form';
import StateRadio from './stateRadio/StateRadio'

import axios from 'axios';

function DeviceView(props) {
    const [ page, setPage ] = useState((null));

    let { deviceId } = useParams();

    useEffect(() => {
        isProcessed = false
        createPage(setPage, deviceId)
        return () => {};
    }, []);

    createPage(setPage, deviceId)
    return page;
}

let isProcessed = false;
async function createPage (setPage, deviceId) {
    if (isProcessed) {
        return
    }
    isProcessed = true

    let device = null
    const config = { "Content-Type": 'application/json' };
    try {
        const response = await axios.get(`/api/device/${deviceId}`, config);
        device = response.data.data;
        console.log(device)
    } catch (error) {
        console.error(error);
        alert('불러오기 실패')
        return
    }

    const {
        device_name: deviceName,
        is_connect: isConnect,
        state
    } = device
    
    const inputs = [
        {
            "label": 'name',
            "type": 'text',
            "name": 'deviceName',
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
    const action = '/api/device/update/name'
    const method = 'post'

    const stateObj = {state}
    const onUpdate = async  () => {
        const isSuccess = await updateState(stateObj.state, deviceId)
        if(isSuccess){
            alert('변경 성공')
        }
        isProcessed = false
        createPage(setPage, deviceId)
    }

    const changeState = (e)=>{
        console.log(stateObj)
        stateObj['state'] = e.target.value
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
                    callBack={onUpdate}
                    successUrl='#'
                    title='수정'
                >
                    <StateRadio value={state} onChange={changeState}></StateRadio>
                </Form>
            </div>
        </section>
    );

    console.log(page)
    setPage(page)
}


async function updateState(state, deviceId) {
    const config = { "Content-Type": 'application/json' };
    const data = {state, deviceId}
    try {
        const response = await axios.post(`/api/device/update/state`, data, config);
        return true
    } catch (error) {
        console.error(error);
        alert('변경 실패')
        return false
    }
}


export default DeviceView;