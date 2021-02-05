'use strict'
const Pss = use('App/Models/Pss')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with psses
 */
class PssController {
  /**
   * Show a list of all psses.
   * GET psses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    return Pss.all()
  }

  /**
   * Render a form to be used for creating a new pss.
   * GET psses/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new pss.
   * POST psses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const dados = await request.only([
      'nrEditalConcurso',
      'anoEditalConcurso',
      'idTipoSelecao',
      'tituloPss',
      'descricaoPss',
      'dataInicio',
      'dataFinal'
    ])
    const pss = await Pss.create(dados)
    return pss
  }

  /**
   * Display a single pss.
   * GET psses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const pss = await Pss.findOrFail(params.id)
    return pss
  }

  /**
   * Render a form to update an existing pss.
   * GET psses/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update pss details.
   * PUT or PATCH psses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a pss with id.
   * DELETE psses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = PssController
