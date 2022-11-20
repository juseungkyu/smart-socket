module.exports = class Controller {
  constructor() {}

  sendResponse(success, code, obj, res) {
    res.status(code)

    res.json(JSON.stringify({
      success,
      data: obj
    }))
  }
}