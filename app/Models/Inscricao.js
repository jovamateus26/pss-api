'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Inscricao extends Model {
  vaga () {
    return this.hasOne('App/Models/Vaga', 'vaga_id', 'id')
  }
  user () {
    return this.hasOne('App/Models/User', 'user_id', 'id')
  }
}

module.exports = Inscricao
