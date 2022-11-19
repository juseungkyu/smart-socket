import './deviceList.css'
import Device from '../../basic/element/device/Device'

function DeviceList(props) {
    const deviceDumpDatas = [
        {
            deviceId: 'djeb382lks9',
            deviceName: 'PC 콘센트',
            state: 'F'
        },
        {
            deviceId: 'djeb382lks9',
            deviceName: '전등 콘센트',
            state: 'T'
        },
    ]

    return (
        <section>
            <div className="deviceList gap-3 container">
                {
                    deviceDumpDatas.map((device)=>{
                        const {deviceId, deviceName, state} = device

                        return (<Device 
                            deviceId={deviceId}
                            deviceName={deviceName}
                            state={state}
                        />)
                    })
                }
                
            </div>
        </section>
    );
}

export default DeviceList;