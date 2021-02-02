'use strict'

class PssStore {
  get rules () {
    return {
      // validation rules
      nrEditalConcurso: 'required|integer',
      anoEditalConcurso: 'required|integer|min:4|max:4',
      idTipoSelecao: 'required|integer|min:1|max:4',
      descricaoPss: 'required',
      tituloPss: 'required',
      dataInicio: 'required|date',
      dataFinal: 'required|date'
    }
  }
  get messages () {
    return {
      'nrEditalConcurso.required': 'O campo número do edital não pode ser em branco',
      'nrEditalConcurso.integer': 'O campo número do edital informado deve ser um número inteiro',
      'anoEditalConcurso.required': 'O campo ano do edital não pode ser em branco',
      'idTipoSelecao.required': 'O campo tipo de seleção não pode ser em branco',
      'idTipoSelecao.integer': 'O campo tipo de seleção deve ser um número inteiro',
      'idTipoSelecao.min': 'O valor minimo para esse campo é 1',
      'idTipoSelecao.max': 'O valor não pode ultrapassar 4 digitos',
      'descricaoPss.required': 'O campo descrição não pode ser em branco',
      'tituloPss.required': 'O campo titulo não pode ser em branco',
      'dataInicio.required': 'O campo data inicio não pode ser em branco',
      'dataInicio.date': 'A data informada no campo data inicio é inválida',
      'dataFinal.required': 'O campo data final não pode ser em branco',
      'dataFinal.date': 'A data informada no campo data final é inválida'
    }
  }
}

module.exports = PssStore
