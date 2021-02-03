'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CalculoSchema extends Schema {
  up () {
    this.create('calculos', (table) => {
      table.increments()
      table.integer('vaga_id')
        .unsigned()
        .references('id')
        .inTable('vagas')
        .notNullable()
      table.integer('pontuacao').notNullable()
      table.integer('pontuacaoMax').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('calculos')
  }
}

module.exports = CalculoSchema