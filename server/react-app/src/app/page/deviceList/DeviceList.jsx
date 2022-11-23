import './deviceList.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeviceTree from './deviceTree/DeviceTree';

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
                <DeviceTree deviceList={deviceList}></DeviceTree>
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

export default DeviceList;