import './deviceList.css'
import Device from '../../basic/element/device/Device'
import React, { useState } from 'react';
import axios from 'axios';

function DeviceList(props) {
    const [deviceList, setDeviceList] = useState([])
    createPage(setDeviceList)
    
    return (
        <section>
            <div className="deviceList gap-3 container">
                {
                    deviceList.map((device)=>{
                        const {deviceId, deviceName, state, isConnect} = device

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
    
    const config = { "Content-Type": 'application/json' };
    try {
        const response = await axios.get(`/api/device/all`, config);
        console.log('hi')
        console.log(response.data);
    } catch (error) {
        console.error(error);
        alert(error.response.data.data.message)
        return
    }
    
    const deviceList = [

    ]

    console.log(deviceList)
    setDeviceList(deviceList)
}

export default DeviceList;