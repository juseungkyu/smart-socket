module.exports = class Device {
    constructor({
        device_id,
        device_name,
        member_id,
        isConnect,
        state
    }){ 
        this.device_id = device_id
        this.device_name = device_name
        this.member_id = member_id
        this.isConnect = isConnect
        this.state = state
    }
}