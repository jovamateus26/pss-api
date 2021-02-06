'use strict'

/*
|--------------------------------------------------------------------------
| PssSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const PssModel = use('App/Models/Pss')

class PssSeeder {
  async run() {
    await PssModel.create({
      "nrEditalConcurso": "1",
      "anoEditalConcurso": "2021",
      "idTipoSelecao": "1",
      "descricaoPss": "O PREFEITO MUNICIPAL DE TIBAGI, Estado do Paraná, no uso de suas atribuições legais, em conformidade com o art. 66, VI da Lei Orgânica do município e a Lei Municipal 1.516/97, que dispõem sobre a contratação de pessoal por tempo determinado, para atender à necessidade temporária de excepcional interesse público, resolve: TORNAR PÚBLICO o presente  Edital que  estabelece instruções especiais  destinadas à realização  deste Processo  Seletivo Simplificado – PSS, visando suprir as funções para o cargo de Professor de Educação Infantil e Professor de Ensino Fundamental I -  cadastro reserva, de acordo com as normas estabelecidas neste Edital.",
      "tituloPss": "EDITAL DE PROCESSO SELETIVO SIMPLIFICADO - PSS",
      "dataInicio": "2021-02-06",
      "dataFinal": "2021-02-17"
    })
  }
}

module.exports = PssSeeder
