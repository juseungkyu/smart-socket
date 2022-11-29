const DAO = require('./DAO')

module.exports = class extends DAO {
  constructor() {
    super()
  }

  //디바이스 가져오는 함수
  async getDevice(deviceId) {
    const result = {}
    const sql = 'select * from device where device_id=?';
    const data = [deviceId]
    const isSuccess = await this.run(sql, data, result)

    return {
      isSuccess,
      result: result.dbResult
    }
  }

  // 디바이스 리스트
  async getListDevice(memberId) {
    const result = {}
    const sql = 'select * from device where member_id = ?';
    const data = [memberId]
    const isSuccess = await this.run(sql, data, result)

    return {
      isSuccess,
      result: result.dbResult
    }
  }

  // 디바이스 전체
  async getAllDevice() {
    const result = {}
    const sql = 'select * from device';
    const data = []
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

  /**
  * 디바이스 등록 
  */
  async applicationDevice(deviceId, deviceName, memberId) {
    const result = {};
    const sql = "UPDATE device SET member_id=?, device_name=? WHERE device_id=?";
    const data = [memberId, deviceName, deviceId];

    const isSuccess = await this.run(sql, data, result)

    return {
      isSuccess,
      result : result.dbResult
    }
  }

  //장치 상태 변경함수
  // true, false로 반환.
  async changeDeviceState(deviceId, state) {
    const result = {}
    const sql = 'update device set state=? where device_id=?';
    const data = [state, deviceId]
    
    const isSuccess = await this.run(sql, data, result)

    return {
      isSuccess,
      result: result.dbResult
    }
  }

  //장치 변경함수
  async changeDevice(deviceId, deviceName) {
    const result = {}
    const sql = 'update device set device_name=? where device_id=?';
    const data = [deviceName, deviceId]
    
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
    const data = [isConnect, deviceId]
    
    const isSuccess = await this.run(sql, data, result)

    return {
      isSuccess,
      result: result.dbResult
    }
  }

  // 장치 접속
  async deviceConnect(deviceId, time) {
    const result = {}
    const sql = 'UPDATE device SET last_connect=? WHERE device_id=?'
    const data = {time, deviceId}

    const isSuccess = await this.run(sql, data, result)

    return {
      isSuccess,
      result: result.dbResult
    }
  }
}
