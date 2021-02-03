'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VagaSchema extends Schema {
  up () {
    this.create('vagas', (table) => {
      table.increments()
      table.integer('cdOpcao').unique().notNullable()
      table.string('nmVaga').notNullable()
      table.string('localVaga').notNullable()
      table.integer('qtdVaga').notNullable()
      table.integer('pss_id')
        .unsigned()
        .references('id')
        .inTable('pss')
        .notNullable()
      table.json('calculo')
      table.timestamps()
    })
  }

  down () {
    this.drop('vagas')
  }
}

module.exports = VagaSchema
