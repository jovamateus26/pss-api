'use strict'

class VagaStore {
  get rules () {
    return {
      // validation rules
      cdOpcao: 'required|integer',
      nmVaga: 'required',
      localVaga: 'required',
      qtdVaga: 'required|integer',
      pss_id: 'required|integer|exists,pss,id'
    }
  }
  get messages () {
    return {
      'cdOpcao.required': 'Informe o código de opção do cargo oferecido',
      'cdOpcao.integer': 'O código de opção do cargo oferecido deve ser um número inteiro',
      'nmVaga.required': 'O campo cargo não pode ser em branco',
      'localVaga.required': 'O campo local da vaga não pode ser em branco',
      'qtdVaga.required': 'O campo quantidade de vagas não pode ser em branco',
      'qtdVaga.integer': 'A quantidade de vagas deve ser um número inteiro',
      'pss_id.required': 'Selecione um pss para vincular a vaga',
      'pss_id.integer': 'O campo id do pss deve ser um número inteiro',
      'pss_id.exists': 'O PSS informado não existe'
    }
  }
}

module.exports = VagaStore
