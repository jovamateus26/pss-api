'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Vaga extends Model {
  pss () {
    return this.hasOne('App/Models/Pss', 'pss_id','id')
  }
}

module.exports = Vaga
