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
      table.string('titulo').notNullable()
      table.string('descricao').notNullable()
      table.integer('pontuacao').notNullable()
      table.integer('pontuacaoMax').notNullable()
      table.timestamps()
      table.unique(['vaga_id', 'titulo'])
    })
  }

  down () {
    this.drop('calculos')
  }
}

module.exports = CalculoSchema
