'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InscricaoSchema extends Schema {
  up () {
    this.create('inscricaos', (table) => {
      table.increments()
      table.integer('users_id')
        .unsigned()
        .references('id')
        .inTable('users')
      table.integer('vaga_id')
        .unsigned()
        .references('id')
        .inTable('vagas')
      table.timestamps()
    })
  }

  down () {
    this.drop('inscricaos')
  }
}

module.exports = InscricaoSchema
