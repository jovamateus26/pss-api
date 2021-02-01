'use strict'

class StoreUser {
  get rules () {
    return {
      // validation rules
      email: 'required|email|unique:users',
      password: 'required|confirmed',
      nrDocumento: 'required|cpf|unique:users',
      nmPessoa: 'required',
      flPNE: 'required|max:1',
      flAfrodescendente: 'required|max:1',
      flIndio: 'required',
      dataNascimento: 'required|date',
      endereco: 'required'
    }
  }
  get messages () {
    return {
      'email.required': 'O campo email não pode ser em branco',
      'email.email': 'O email informado não é valido',
      'email.unique': 'O email informado já está em uso',
      'password.required': 'O campo senha não pode ser em branco',
      'password.confirmed': 'As senhas nao são iguais',
      'nrDocumento.required': 'O campo cpf não pode ser em branco',
      'nrDocumento.cpf': 'O cpf informado é inválido',
      'nrDocumento.unique': 'O cpf informado já está em uso',
      'flPNE.required': 'Deve ser informado é portador de deficiencia',
      'flPNE.max': 'Use S ou N',
      'flAfrodescendente.required': 'A opção afrodescendente deve ser informada',
      'flAfrodescendente.max': 'Use S ou N',
      'flIndio.required': 'Informe a opção indigina',
      'dataNascimento.required': 'O campo data de nascimento não pode ser em branco',
      'dataNascimento.date': 'A data informada é inválida',
      'endereco.required': 'O campo endereço não pode ser em branco'
    }
  }
}

module.exports = StoreUser
