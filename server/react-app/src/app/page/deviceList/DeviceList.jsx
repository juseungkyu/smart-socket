import './deviceList.css'
import Device from '../../basic/element/device/Device'
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
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
        console.log(response);
    } catch (error) {
        console.error(error);
        alert('불러오기 실패')
        isProcessing = false
        return
    }
    
    const deviceList = [

    ]

    console.log(deviceList)
    setDeviceList(deviceList)
}

export default DeviceList;