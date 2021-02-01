'use strict'

class StoreUser {
  get rules () {
    return {
      // validation rules
      email: 'required|email|unique:users',
      password: 'required|confirmed',
      nrDocumento: 'required',
      nmPessoa: 'required',
      flPNE: 'required',
      flAfrodescendente: 'required',
      flIndio: 'required',
      dataNascimento: 'required',
      endereco: 'required',
      nrEndereco: ''
    }
  }
  get message () {
    return {
      'email.required': 'O campo email não pode ser em branco',
      'email.email': 'O email informado não é valido',
      'password.required': 'O campo senha não pode ser em branco',
      'password': ''
    }
  }
}

module.exports = StoreUser
