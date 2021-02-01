'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VagaSchema extends Schema {
  up () {
    this.create('vagas', (table) => {
      table.increments()
      table.integer('cdOpcao').notNullable()
      table.integer('nmvaga').notNullable()
      table.string('localVaga').notNullable()
      table.integer('qtdVaga').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('vagas')
  }
}

module.exports = VagaSchema
