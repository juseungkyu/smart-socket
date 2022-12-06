import './deviceNode.css'
import React from 'react';
import { Link } from 'react-router-dom';

function DeviceNode(props) {
    const {
        deviceId,
        deviceName,
        state,
        isConnect,
    } = props

    // 현재 연결 상태, 전기 통과 여부를 판단하여 클래스 추가
    let classes = 'device-node'
    if(isConnect){
        classes += ' unconnect'
    } else if(state){
        classes += ' active'
    }

    return (
        <Link to={`/device/${deviceId}`} className={classes}>
            <div>
                <p>{deviceName}</p>
            </div>
        </Link>
    );
}

export default DeviceNode;