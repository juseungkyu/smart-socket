import './deviceList.css'
import Device from '../../basic/element/device/Device'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DeviceList(props) {
    const [deviceList, setDeviceList] = useState([])

    useEffect(() => {
        isProcessed = false
        createPage(setDeviceList)
        return () => {};
    }, []);

    return (
        <section>
            <div className="deviceList gap-3 container">
                {
                    deviceList.map((device) => {
                        const { deviceId, deviceName, state, isConnect } = device

                        console.log(deviceId, state, isConnect)

                        return (<Device
                            key={deviceId}
                            deviceId={deviceId}
                            deviceName={deviceName}
                            isConnect={isConnect}
                            state={state}
                        />)
                    })
                }

            </div>
        </section>
    );
}

let isProcessed = false;
const createPage = async (setDeviceList) => {
    if (isProcessed) {
        return
    }
    isProcessed = true

    console.log(isProcessed)

    let deviceList = []
    const config = { "Content-Type": 'application/json' };
    try {
        const response = await axios.get(`/api/device/all`, config);
        console.log('hi')
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
            state
        } = device

        return {
            deviceId: device_id,
            deviceName: device_name,
            memberId: member_id,
            isConnect: is_connect,
            state
        }
    })

    console.log(deviceList)
    setDeviceList(deviceList)
}

export default DeviceList;