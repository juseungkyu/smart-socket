import './deviceNode.css'
import React from 'react';

function DeviceNode(props) {
    const {
        deviceId,
        deviceName,
        onClick
    } = props

    console.log(onClick)

    let classes = 'device-node unconnect'

    return (
        <div onClick={(e)=>{onClick(e, this)}} to={`/device/${deviceId}`} className={classes}>
            <div>
                <p>{deviceName}</p>
            </div>
        </div>
    );
}

export default DeviceNode;