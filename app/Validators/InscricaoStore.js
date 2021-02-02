'use strict'

class InscricaoStore {
  get rules () {
    return {
      // validation rules
      user_id: 'required|integer|exists,users,id',
      vaga_id: 'required|integer|exists,user,id'
    }
  }
  get messages () {
    return {
      'user_id.required': 'O campo usuário não pode ser vazio',
      'user_id.integer': 'O a ide do usuário deve ser um número inteiro',
      'user_id.exists': 'O usuário informado é inválido'
    }
  }
}

module.exports = InscricaoStore
