'use strict'

/*
|--------------------------------------------------------------------------
| VagaSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const VagaModel = use('App/Models/Vaga')
class VagaSeeder {
  async run () {
    await VagaModel.create({
      "cdOpcao": "277",
      "nmVaga": "Professor de Educação Infantil",
      "localVaga": "Sede",
      "qtdVaga": "2",
      "pss_id": "1"
    })
    await VagaModel.create({
      "cdOpcao": "278",
      "nmVaga": "Professor de Educação Infantil",
      "localVaga": "Distrito de Caetano Mendes",
      "qtdVaga": "0",
      "pss_id": "1"
    })
    await VagaModel.create({
      "cdOpcao": "279",
      "nmVaga": "Professor de Ensino Fundamental I",
      "localVaga": "Sede",
      "qtdVaga": "0",
      "pss_id": "1"
    })
    await VagaModel.create({
      "cdOpcao": "280",
      "nmVaga": "Professor de Ensino Fundamental I",
      "localVaga": "Distrito de Caetano Mendes",
      "qtdVaga": "0",
      "pss_id": "1"
    })
    await VagaModel.create({
      "cdOpcao": "281",
      "nmVaga": "Professor de Ensino Fundamental I",
      "localVaga": "Distrito de São Bento",
      "qtdVaga": "0",
      "pss_id": "1"
    })

  }
}

module.exports = VagaSeeder
