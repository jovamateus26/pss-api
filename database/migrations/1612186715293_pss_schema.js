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
      table.string('tituloPss').notNullable()
      table.text('descricaoPss').notNullable()
      table.date('dataInicio').notNullable()
      table.date('dataFinal').notNullable()
      table.timestamps()
      table.unique(['nrEditalConcurso','anoEditalConcurso'])
    })
  }

  down () {
    this.drop('pss')
  }
}

module.exports = PssSchema
