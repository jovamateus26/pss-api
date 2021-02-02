'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InscricaoSchema extends Schema {
  up () {
    this.create('inscricaos', (table) => {
      table.increments()
      table.integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .notNullable()
      table.integer('vaga_id')
        .unsigned()
        .references('id')
        .inTable('vagas')
        .notNullable()
      table.integer('pss_id')
        .unsigned()
        .references('id')
        .inTable('pss')
        .notNullable()
      table.json('titulos')
      table.timestamps()
      table.unique(['user_id', 'pss_id'])
    })
  }

  down () {
    this.drop('inscricaos')
  }
}

module.exports = InscricaoSchema
