module.exports = class Controller {
    constructor() {
        this.SucRes = SucRes
        this.FailRes = FailRes
      }
    
      sendSuccess(code, obj, res) {
        const result = new this.SucRes()
    
        result.setCode = code
        result.setResult = obj
        res.end(this.toString(result))
      }
    
      sendFailure(code, message, res, callback = () => {}) {
        const result = new this.FailRes()
    
        result.setCode = code
        result.setErrMessage = message
    
        res.end(this.toString(result))
    
        try {
          callback()
        } catch (error) {
          const { app } = res
    
          app.get('config')
          console.log(error)
        }
      }
    
      toString(obj) {
        if (typeof obj !== 'object') {
          console.log('TypeError: missmatch type');
        }
    
        return JSON.stringify(obj)
      }
}