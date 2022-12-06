import './device.css'
import { Link } from 'react-router-dom';

/**
 * Device 컴포넌트
 * @param {*} props 
 * @returns Device
 */
function Device(props) {
    const {
        deviceId,
        deviceName,
        isConnect,
        state
    } = props

    console.log(state, isConnect)

    return(
        <Link to={`/device/${deviceId}`} className={`device d-flex justify-between ${state ? 'on' : 'off'}`}>
            <div>
                <h4>{deviceName}</h4>
                <p className='mt-2'>디바이스 아이디 : {deviceId}</p>
                <p className='mt-2 state'>{state ?  '켜짐' : '꺼짐'}</p>
            </div>
            <div className='d-flex flex-col align-end'>
                <p>{isConnect ? '디바이스와 연결되어 있습니다.':'연결이 끊겨 있는 디바이스입니다. 표시된 상태와 실제 상태가 다를 수 있습니다.'}</p>
            </div>
        </Link>
    )
}

export default Device;