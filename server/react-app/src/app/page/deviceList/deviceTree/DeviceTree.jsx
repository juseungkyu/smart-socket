import './deviceTree.css'
import Device from '../../../basic/element/device/Device'
import React from 'react';

let count = 0
function DeviceTree(props) {
    const { deviceList } = props

    console.log(count, deviceList)

    const deviceTree = createTree(deviceList)
    console.log(deviceTree)
    return (createTreeDom(deviceTree));
}

// deviceList를 tree 형식으로 변환
const createTree = (deviceList) => {
    const deviceTree = { deviceId: -1, children: [] };
    let currentNode = null;
    let queue = [deviceTree];

    console.log(deviceList);
    while (deviceList.length) {
        currentNode = queue.shift();
        if(!currentNode) {
            break;
        }

        deviceList = deviceList.filter(device => {
            const { parentDevice } = device
            if (currentNode.deviceId === parentDevice) {
                device.children = []
                delete device.parentDevice
                currentNode.children.push(device)
                return false
            }

            return true
        })

        queue.push(...currentNode.children)
    }

    return deviceTree
}

const createTreeDom = (deviceTree) => {
    return (
        <ul>
            {
                deviceTree.children.map((device)=> {
                    const {deviceId, deviceName, state, isConnect, children} = device
                    return (
                        <li>
                            <a href={`/device/${deviceId}`}>{deviceName}</a>
                            {createTreeDom(children)}
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default DeviceTree;