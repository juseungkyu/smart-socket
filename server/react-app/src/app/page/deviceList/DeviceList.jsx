import './deviceList.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeviceTree from './deviceTree/DeviceTree';

/**
 * 유저의 디바이스를 모두 출력 (현재는 트리 형식으로 출력함)
 * @param {*} props 
 * @returns deviceList
 */
function DeviceList(props) {
    const [deviceList, setDeviceList] = useState([])

    // 페이지가 새로 로딩되면 값 새로 불러오기
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

// 비동기로 페이지 설정
let isProcessed = false;
const createPage = async (setDeviceList) => {
    if (isProcessed) {
        return
    }
    isProcessed = true

    // 정보 불러오기
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