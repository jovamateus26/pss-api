'use strict'

class AlterarSenha {
  get rules () {
    return {
      // validation rules
      token: 'required',
      password: 'required|confirmed'
    }
  }
}

module.exports = AlterarSenha
