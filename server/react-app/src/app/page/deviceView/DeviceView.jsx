import './deviceView.css'
import Device from '../../basic/element/device/Device'

function DeviceView(props) {
    let { deviceId } = useParams();

    const dumpData = {
        deviceId: '123124fg575',
        deviceName: '전등 콘센트',
        isConnect : 0,
        state: 1
    }

    return (
        <section>
            <div className="deviceView gap-3 container">
                {

                }
            </div>
        </section>
    );
}

export default DeviceView;