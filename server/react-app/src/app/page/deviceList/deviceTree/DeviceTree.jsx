import './deviceTree.css';
import React from 'react';
import DeviceNode from './deviceNode/DeviceNode';

/**
 * 디바이스 리스트를 디바이스 트리로 변환하여 출력함
 * @param {*} props 
 * @returns device tree
 */
function DeviceTree(props) {
    const { deviceList } = props

    const deviceTree = createTree(deviceList)
    return (
        <section className='device-tree'>
            {createTreeDom(deviceTree)}
        </section>
    );
}

/**
 * tree 생성
 * @param {*} deviceList 디바이스 리스트
 * @returns tree 형태의 오브젝트를 반환함
 */
const createTree = (deviceList) => {
    const deviceTree = { deviceId: -1, children: [] };
    let currentNode = null;
    let queue = [deviceTree];

    // bfs처럼 그래프를 탐색하고 저장함 
    while (deviceList.length) {
        currentNode = queue.shift();
        if(!currentNode) {
            break;
        }

        // 탐색한 노드는 제거함
        deviceList = deviceList.filter(device => {
            const { parentDevice } = device

            // 현재 노드의 디바이스 아이디와 탐색하고 있는 노드의 상위 노드 아이디가 같다면 자식노드로 추가 
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

/**
 * tree object를 dom으로 변환
 * @param {*} deviceTree createTree()를 이용해 생성한 트리 
 * @returns tree dom
 */
const createTreeDom = (deviceTree) => {
    if(deviceTree.children.length == 0){
        return (null)
    }

    // 재귀호출을 하여 생성
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