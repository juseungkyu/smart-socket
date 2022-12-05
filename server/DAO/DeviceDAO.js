const DAO = require('./DAO')

module.exports = class extends DAO {
  constructor() {
    super()
  }

  /**
   * 디바이스 조회
   * @param deviceId 조회할 디바이스의 id
   * @returns Object {isSuccess, result} 가 반환됨. result[0]이 없다면 디바이스를 찾을 수 없음
   */
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

  /**
   * 디바이스 리스트 조회
   * @param memberId 디바이스를 조회할 멤버의 id
   * @returns Object {isSuccess, result} 가 반환됨. result에 array 형식으로 값 들어감
   */
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

  /**
   * 디바이스 전체 조회
   * @returns Object {isSuccess, result} 가 반환됨. result에 array 형식으로 값 들어감
   */
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

  /**
   * 등록 가능 디바이스 추가
   * @param deviceId 생성할 디바이스의 아이디
   * @returns Object {isSuccess, result} 가 반환됨.
   */
  async createDevice(deviceId) {
    const result = {}
    const sql = 'insert into device set ?';
    const data = {
      device_id: deviceId
    }

    const isSuccess = await this.run(sql, data, result)

    return {
      isSuccess,
      result: result.dbResult
    }
  }

  /**
   * 디바이스 등록
   * @param deviceId 디바이스의 아이디
   * @param deviceName 설정할 디바이스의 이름
   * @param parentDevice 부모 디바이스의 아이디
   * @param memberId 등록하는 멤버의 아이디
   * @returns Object {isSuccess, result} 가 반환됨.
   */
  async applicationDevice(deviceId, deviceName, parentDevice, memberId) {
    const result = {};
    const sql = "UPDATE device SET member_id=?, device_name=?, parent_device=? WHERE device_id=?";
    const data = [memberId, deviceName, parentDevice, deviceId];

    const isSuccess = await this.run(sql, data, result)

    return {
      isSuccess,
      result: result.dbResult
    }
  }

  /**
   * 장치 상태 변경
   * @param deviceId 디바이스의 아이디
   * @param state 변경할 디바이스의 상태
   * @returns Object {isSuccess, result} 가 반환됨.
   */
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

  /**
   * 장치 정보 변경
   * @param deviceId 디바이스의 아이디
   * @param deviceName 변경할 디바이스의 이름
   * @returns Object {isSuccess, result} 가 반환됨.
   */
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

  /**
   * 장치 연결상태 변경
   * @param deviceId 디바이스의 아이디
   * @param isConnect 변경할 디바이스의 연결 상태
   * @returns Object {isSuccess, result} 가 반환됨.
   */
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
}
