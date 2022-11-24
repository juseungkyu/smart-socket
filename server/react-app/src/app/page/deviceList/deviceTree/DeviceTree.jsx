import './deviceTree.css';
import React from 'react';
import DeviceNode from './deviceNode/DeviceNode';

function DeviceTree(props) {
    const { deviceList } = props

    const deviceTree = createTree(deviceList)
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
                            <DeviceNode 
                                deviceId={deviceId}
                                deviceName={deviceName}
                                state={state}
                                isConnect={isConnect}
                            />
                            {createTreeDom(device)}
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default DeviceTree;