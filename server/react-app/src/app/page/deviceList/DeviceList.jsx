import './deviceList.css'
import Device from '../../basic/element/device/Device'

function DeviceList(props) {
    const deviceDumpDatas = [
        {
            deviceId: 'djeb382lks9',
            deviceName: 'PC 콘센트',
            isConnect : 1,
            state: 0
        },
        {
            deviceId: '123124fg575',
            deviceName: '전등 콘센트',
            isConnect : 0,
            state: 1
        },
    ]

    return (
        <section>
            <div className="deviceList gap-3 container">
                {
                    deviceDumpDatas.map((device)=>{
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

export default DeviceList;