import './deviceTree.css';
import React from 'react';
import DeviceNode from './deviceNode/DeviceNode';

function DeviceTree(props) {
    const { deviceList, setParentNode } = props

    const deviceTree = createTree(deviceList)
    return (
        <section className='device-tree'>
            {createTreeDom(deviceTree, setParentNode)}
        </section>
    );
}

// deviceList를 tree 형식으로 변환
const createTree = (deviceList) => {
    const deviceTree = { deviceId: -1, children: [] };
    let currentNode = null;
    let queue = [deviceTree];

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

const createTreeDom = (deviceTree, setParentNode) => {
    if(deviceTree.children.length == 0){
        return (null)
    }

    return (
        <ul>
            {
                deviceTree.children.map((device)=> {
                    const {deviceId, deviceName, state, isConnect, children} = device
                   
                    const onClick = (e1)=>{
                        const device = {deviceId, deviceName}
                        console.log('click', device)
                        setParentNode(device)
                    }

                    const node = (
                        <DeviceNode 
                            deviceId={deviceId}
                            deviceName={deviceName}
                            state={state}
                            isConnect={isConnect}
                            onClick={onClick}
                        />
                    )

                    return (
                        <li>
                            {node}
                            {createTreeDom(device, setParentNode)}
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default DeviceTree;