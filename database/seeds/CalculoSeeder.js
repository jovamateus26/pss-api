'use strict'

/*
|--------------------------------------------------------------------------
| CalculoSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const CalculoModel = use('App/Models/Calculo')

class CalculoSeeder {
  async run() {
    await CalculoModel.create({
      "vaga_id": "1",
      "pontuacao": "15",
      "pontuacaoMax": "15",
      "titulo": "magisterio",
      "descricao": "Curso de nível médio completo na modalidade normal (MAGISTÉRIO)."
    })
    await CalculoModel.create({
      "vaga_id": "1",
      "pontuacao": "35",
      "pontuacaoMax": "35",
      "titulo": "licenciaturaPlenaPedagogia",
      "descricao": "Licenciatura plena completa em PEDAGOGIA com habilitação para o magistério ou CURSO NORMAL SUPERIOR reconhecido pelo Mec."
    })
    await CalculoModel.create({
      "vaga_id": "1",
      "pontuacao": "20",
      "pontuacaoMax": "20",
      "titulo": "licenciaturaPlena",
      "descricao": "Licenciatura Plena completa numa das áreas do conhecimento da Educação Básica,  diferente do curso apresentado para contratação."
    })
    await CalculoModel.create({
      "vaga_id": "1",
      "pontuacao": "10",
      "pontuacaoMax": "20",
      "titulo": "posGraduacao",
      "descricao": "Pós-Graduação completa em nível de especialização;"
    })
    await CalculoModel.create({
      "vaga_id": "1",
      "pontuacao": "1",
      "pontuacaoMax": "10",
      "titulo": "experiencia",
      "descricao": "Experiência na docência de Professor de   Educação Infantil de 2011 a 2020."
    })
  }
}

module.exports = CalculoSeeder
