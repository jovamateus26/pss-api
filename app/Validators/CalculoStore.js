'use strict'

class CalculoStore {
  get rules () {
    return {
      // validation rules
      vaga_id: 'required|integer|exists,vagas,id',
      pontuacao: 'required|integer',
      pontuacaoMax: 'required|integer',
      titulo: 'required',
      descricao: 'required'
    }
  }
  get messages () {
    return {
      'vaga_id.required': 'O campo id da vaga não pode ser vazio',
      'vaga_id.integer': 'O campo id da vaga deve ser um número inteiro',
      'vaga_id.exists': 'A id da vaga é inváldia',
      'pontuacao.required': 'O campo pontuação não pode ser em branco',
      'pontuacao.integer': 'O campo pontuação deve ser um número inteiro',
      'pontuacaoMax.required': 'O campo pontuação máxima não pode ser em branco',
      'pontuacaoMax.integer': 'O campo pontuação máxima deve ser um número inteiro',
      'titulo.required': 'O campo titulo não pode ser em branco',
      'descricao.required': 'O campo descricao não pode ser em branco'
    }
  }
}

module.exports = CalculoStore
