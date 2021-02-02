'use strict'

class InscricaoStore {
  get rules () {
    return {
      // validation rules
      user_id: 'required|integer|exists,users,id',
      vaga_id: 'required|integer|exists,vagas,id',
      titulos: 'required'
    }
  }
  get messages () {
    return {
      'user_id.required': 'O campo usuário não pode ser vazio',
      'user_id.integer': 'A id do usuário deve ser um número inteiro',
      'user_id.exists': 'O usuário informado é inválido',
      'vaga_id.required': 'O campo vaga id não pode ser vazio',
      'vaga_id.integer': 'A id da vaga deve ser um número inteiro',
      'vaga_id.exists': 'A id da vaga é inválida'
    }
  }
}

module.exports = InscricaoStore
