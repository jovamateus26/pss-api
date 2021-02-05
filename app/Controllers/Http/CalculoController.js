'use strict'
const Calculo = use('App/Models/Calculo')
const Inscricao = use('App/Models/Inscricao')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with calculos
 */
class CalculoController {
  /**
   * Show a list of all calculos.
   * GET calculos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const calculo = await Calculo.all()
    return calculo
  }

  /**
   * Render a form to be used for creating a new calculo.
   * GET calculos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new calculo.
   * POST calculos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    const data = request.only([
      'vaga_id',
      'pontuacao',
      'pontuacaoMax',
      'titulo',
      'descricao'
    ])
    const calculo = Calculo.create(data)
    return calculo
  }

  /**
   * Display a single calculo.
   * GET calculos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const inscricao = await Inscricao.findOrFail(params.id)
    const titulos = inscricao.titulos
    let calculo = await Calculo
      .query()
      .where('vaga_id', '=', inscricao.vaga_id)
      .fetch()
    calculo = calculo.toJSON()
    let parcial = []
    for (let row in calculo) {
      const titulo = calculo[row].titulo
      const total = await this.calcularTitulo(titulos[calculo[row].titulo], calculo[row])
      parcial.push({titulo, total})
    }
    const total = await this.calcularTotal(parcial)

    response.status(200).send({inscricao,parcial,total})
  }

  /**
   * Render a form to update an existing calculo.
   * GET calculos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update calculo details.
   * PUT or PATCH calculos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a calculo with id.
   * DELETE calculos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }

  async calcularTitulo(titulo, calculo) {
    const parcial = titulo?titulo * calculo.pontuacao:0
    const valor = parcial < calculo.pontuacaoMax?parcial:calculo.pontuacaoMax

    return valor
  }

  async calcularTotal(parcial) {
    let total = 0
    for (let parc in parcial) {
      total = total+parcial[parc].total
    }
    return total
  }
}

module.exports = CalculoController
