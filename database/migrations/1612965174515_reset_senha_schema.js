'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ResetSenhaSchema extends Schema {
  up () {
    this.create('reset_senhas', (table) => {
      table.increments()
      table.string('email').notNullable()
      table.string('token').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('reset_senhas')
  }
}

module.exports = ResetSenhaSchema
