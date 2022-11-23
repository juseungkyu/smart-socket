import './deviceTree.css';
import React from 'react';

let count = 0
function DeviceTree(props) {
    const { deviceList } = props

    console.log(count, deviceList)
    count++

    const deviceTree = createTree(deviceList)
    console.log(deviceTree)
    return (
        <section className='device-tree'>
            {createTreeDom(deviceTree)}
        </section>
    );
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
                console.log(currentNode.deviceId , parentDevice, currentNode.deviceId === parentDevice)
                device.children = []
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
    if(deviceTree.children.length == 0){
        return (null)
    }

    return (
        <ul>
            {
                deviceTree.children.map((device)=> {
                    const {deviceId, deviceName, state, isConnect, children} = device
                    return (
                        <li>
                            <a href={`/device/${deviceId}`}>{deviceName}</a>
                            {createTreeDom(device)}
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default DeviceTree;