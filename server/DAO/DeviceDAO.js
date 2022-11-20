const DAO = require('./DAO')

module.exports = class extends DAO {
  constructor() {
    super()
  }

  //사용자 가져오는 함수
  async getDevice(deviceId) {
    const result = {
      id : 1
    }
    const sql = 'select * from device where device_id=?';
    const data = [deviceId]
    const isSuccess = await this.run(sql, data, result)

    return {
      isSuccess,
      result: result.dbResult
    }
  }

  async getAllDevice(memberId) {
    const result = {
      id : 1
    }
    const sql = 'select * from device where member_id = ?';
    const data = [memberId]
    const isSuccess = await this.run(sql, data, result)

    return {
      isSuccess,
      result: result.dbResult
    }
  }

  async getDeviceState(deviceId) {
    const result = {
      id : 1
    }
    const sql = 'select state from device where device_id=?';
    const data = [deviceId]
    const isSuccess = await this.run(sql, data, result)

    return {
      isSuccess,
      result: result.dbResult
    }
  }

  async getDeviceConnect(deviceId) {
    const result = {
      id : 1
    }
    const sql = 'select is_connect from device where device_id=?';
    const data = [deviceId]
    const isSuccess = await this.run(sql, data, result)

    return {
      isSuccess,
      result: result.dbResult
    }
  }

  // 장치 추가 함수.
  // 성공시 true, 실패시 false로 리턴.
  async createDevice(deviceId, deviceName, memberId) {
    const result = {}
    const sql = 'insert into member set ?';
    const data = { deviceId, deviceName, memberId}
    
    const isSuccess = await this.run(sql, data, result)

    return {
      isSuccess,
      result: result.dbResult
    }
  }

  //장치 상태 변경함수
  // true, false로 반환.
  async changeDeviceState(deviceId, state) {

    const result = {}
    const sql = 'update device set state=? where device_id=?';
    const data = [deviceId,state]
    
    const isSuccess = await this.run(sql, data, result)

    return {
      isSuccess,
      result: result.dbResult
    }
  }

  //장치 연결 상태 함수
  // true, false로 반환.
  async changeDeviceConnect(deviceId, isConnect) {

    const result = {}
    const sql = 'update device set is_connect=? where device_id=?';
    const data = [deviceId,isConnect]
    
    const isSuccess = await this.run(sql, data, result)

    return {
      isSuccess,
      result: result.dbResult
    }
  }

}
