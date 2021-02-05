'use strict'
const Vaga = use('App/Models/Vaga')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with vagas
 */
class VagaController {
  /**
   * Show a list of all vagas.
   * GET vagas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const vaga = await Vaga
      .query()
      .with('pss')
      .fetch()
    return vaga
  }

  async vagaPss ({ request, params, response, view }) {
    const vaga = await Vaga
      .query()
      .where('pss_id', '=', params.id)
      .with('pss')
      .fetch()
    return vaga
  }

  /**
   * Render a form to be used for creating a new vaga.
   * GET vagas/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new vaga.
   * POST vagas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = await request.only([
      'cdOpcao',
      'nmVaga',
      'localVaga',
      'qtdVaga',
      'pss_id'
    ])
    const vaga = await Vaga.create(data)
    return vaga
  }

  /**
   * Display a single vaga.
   * GET vagas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing vaga.
   * GET vagas/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update vaga details.
   * PUT or PATCH vagas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a vaga with id.
   * DELETE vagas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = VagaController
