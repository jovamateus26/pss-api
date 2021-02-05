'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('nrDocumento', 60).notNullable().unique()
      table.string('nmPessoa', 80).notNullable()
      table.string('flPNE', 1).notNullable().default('N')
      table.string('flAfrodescendente', 1).notNullable().default('N')
      table.string('flIndio', 1).notNullable().default('N')
      table.date('dataNascimento').notNullable()
      table.string('endereco').notNullable()
      table.integer('nrEndereco')
      table.integer('isAdmin', 1).default(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
