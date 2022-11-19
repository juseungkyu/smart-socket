import './device.css'
import Btn from '../btn/Btn';

function Device(props) {
    const {
        deviceId,
        deviceName,
        state
    } = props
    return(
        <div className={`device d-flex justify-between ${state=='F' ? 'off' : 'on'}`}>
            <div>
                <h4>{deviceName}</h4>
                <p className='mt-2'>디바이스 아이디 : {deviceId}</p>
            </div>
            <div>
                <p className='state'>{state=='F' ? '꺼짐' : '켜짐'}</p>
                <Btn></Btn>
            </div>
        </div>
    )
}

export default Device;