'use strict'

class SessionLogin {
  get rules () {
    return {
      // validation rules
      email: 'required'
    }
  }
}

module.exports = SessionLogin
