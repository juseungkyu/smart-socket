import './deviceCreate.css'
import React, { useState, useEffect, useRef } from 'react';
import Form from '../../basic/element/form/Form';
import DeviceTree from './deviceTree/DeviceTree';
import axios from 'axios';

function DeviceCreate(props) {
    const [deviceList, setDeviceList] = useState([])
    const [parentNode, setParentNode] = useState({
        deviceId : -1,
        deviceName : '없음'
    })

    useEffect(() => {
        isProcessed = false
        getDeviceList(setDeviceList)
        return () => {};
    }, []);

    let deviceTree = null

    if(deviceList.length != 0){
        deviceTree = (<DeviceTree 
            deviceList={deviceList}
            clickNode={null}
            setParentNode={setParentNode}
        ></DeviceTree>)
    } else {
        getDeviceList(setDeviceList)
    }
    
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
        {
            "label": 'parentNode.deviceId',
            "type": 'hidden',
            "name": 'parentDevice',
            "value": parentNode.deviceId,
            "readonly": true
        },
    ]

    const action = "/api/device/create"
    const method = "post"

    const form = <Form
            inputs={inputs}
            action={action}
            method={method}
            callBack={onCreate}
            successUrl='/'
            title="기기 등록하기"
            ref={childRef}
        ></Form>

    console.log(childRef)

    childRef.current.changeValue('parentDevice', parentNode.deviceId)

    return (
        <section>
            <div className="deviceCreate container flex-col d-flex justify-center align-center">
                {form}
                <h3>부모 기기 선택 (현재 선택 : {parentNode.deviceName})</h3>
                {deviceTree ? deviceTree : (null)}
            </div>
        </section>
    );
}

let isProcessed = false
const getDeviceList = async (setDeviceList) => {
    if (isProcessed) {
        return
    }
    isProcessed = true

    let deviceList = []
    const config = { "Content-Type": 'application/json' };
    try {
        const response = await axios.get(`/api/device/all`, config);
        deviceList = response.data.data;
    } catch (error) {
        console.error(error);
        alert(error.response.data.data.message)
        return
    }

    deviceList = deviceList.map((device)=>{
        const {
            device_id,
            device_name,
            member_id,
            is_connect,
            state,
            parent_device
        } = device

        return {
            deviceId: device_id,
            deviceName: device_name,
            memberId: member_id,
            isConnect: is_connect,
            parentDevice: parent_device,
            state
        }
    })

    setDeviceList(deviceList)
}

function onCreate(res) {
    alert('등록 되었습니다.')
}

export default DeviceCreate;