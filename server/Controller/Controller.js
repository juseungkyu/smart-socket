module.exports = class Controller {
  constructor() {}

  /**
   * 결과를 전달
   * @param {Boolean} success 
   * @param {Number} code 
   * @param {Object} obj 
   * @param {*} res 
   */
  sendResponse(success, code, obj, res) {
    res.status(code)

    res.json({
      success,
      data: obj
    })
  }
}