const moment = require('moment')

module.exports = class extends Error {
  constructor(code, message = '') {
    super(message)

    this.code = code
    this.setName(this.code)

    this.init()
  }

  init() {
    this.setErrorMessage()
  }

  setName(name) {
    this.name = name
  }

  setErrorMessage() {
    // 타임캘린터
    const dateStr = `[${moment().format(`ddd MMM DD hh:mm:ss YYYY`)}]`
    const processPid = `[pid: ${process.pid}]`
    const errorMessage = `${this.stack}`
    this.message = `${dateStr} ${processPid} ${errorMessage}`
  }
}
