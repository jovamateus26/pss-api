'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PssSchema extends Schema {
  up () {
    this.create('pss', (table) => {
      table.increments()
      table.integer('nrEditalConcurso').notNullable()
      table.integer('anoEditalConcurso').notNullable()
      table.integer('idTipoSelecao').notNullable()
      table.string('descricaoPss').notNullable()
      table.date('dataInicio').notNullable()
      table.date('dataFinal').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('pss')
  }
}

module.exports = PssSchema
