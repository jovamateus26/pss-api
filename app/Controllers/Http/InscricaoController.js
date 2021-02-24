'use strict'
const Inscricao = use('App/Models/Inscricao')
const Vaga = use('App/Models/Vaga')
const Pss = use('App/Models/Pss')
const { validate } = use('Validator')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with inscricaos
 */
class InscricaoController {
  /**
   * Show a list of all inscricaos.
   * GET inscricaos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({request, response, view, auth}) {
    if (auth.user.isAdmin === 1) {
      const inscricao = await Inscricao
        .query()
        .with('vaga')
        .with('vaga.pss')
        .with('user')
        .fetch()

      return inscricao
    } else {
      const inscricao = await Inscricao
        .query()
        .where('user_id', auth.user.id)
        .with('vaga')
        .with('vaga.pss')
        .with('user')
        .fetch()

      return inscricao
    }
  }

  /**
   * Render a form to be used for creating a new inscricao.
   * GET inscricaos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({request, response, view}) {
  }

  /**
   * Create/save a new inscricao.
   * POST inscricaos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({request, response, auth}) {
    const rules = {
      user_id: 'required|integer|exists,users,id|uniqueWhere:inscricaos,user_id,pss_id',
      pss_id: 'required|integer|exists,pss,id'
    }
    const messages ={
      'user_id.required': 'O campo usuário não pode ser vazio',
      'user_id.integer': 'A id do usuário deve ser um número inteiro',
      'user_id.exists': 'O usuário informado é inválido',
      'user_id.uniqueWhere': 'Só é permitido uma inscrição por usuário',
    }
    const data = request.only([
      'vaga_id',
      'titulos'
    ])
    data.user_id = auth.user.id


    const vaga = await Vaga.findOrFail(data.vaga_id)
    data.pss_id = vaga.pss_id

    const valida = await this.validarData(vaga.pss_id)
    if(!valida) {
      response.status(400).send([{data: {message: "Prazo encerrado!"}}])
    }
    const verifica = await this.validarData(vaga.pss_id)
    const validation = await validate(data, rules,messages)
    if (validation.fails()) {
      return response.status(400).send(validation.messages())
    }
    // const inscricao = Inscricao.create(data)
    // return inscricao
    return response.status(400).send([{data: {message: "Prazo encerrado!"}}])
  }

  /**
   * Display a single inscricao.
   * GET inscricaos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({params, request, response, view}) {
  }

  /**
   * Render a form to update an existing inscricao.
   * GET inscricaos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({params, request, response, view}) {
  }

  /**
   * Update inscricao details.
   * PUT or PATCH inscricaos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({params, request, response}) {
  }

  /**
   * Delete a inscricao with id.
   * DELETE inscricaos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({params, request, response, auth}) {
    const { id } = params
    const inscricao = await Inscricao.findOrFail(id)
    const valida = await this.validarData(inscricao.vaga_id)
    if(!valida) {
      response.status(400).send([{data: {message: "Prazo encerrado!"}}])
    }
    if(auth.user.isAdmin === 1) {
      // await inscricao.delete()
      return response.status(400).send([{data: {message: "Prazo encerrado!"}}])
    } else {
      if (auth.user.id === inscricao.user_id) {
        // await inscricao.delete()
        return response.status(400).send([{data: {message: "Prazo encerrado!"}}])
      }else {
        response.status(401).send('Não autorizado')
      }
    }
  }

  async validarData(pss_id) {
    const pss = await Pss.findOrFail(pss_id)
    const final = new Date(pss.dataFinal)
    const agora = new Date()
    final.setHours(23)
    final.setMinutes(59)
    const teste = final
    //return {agora, final,teste}
    if (agora > final) {
      return false
    } else {
      return true
    }
  }
}

module.exports = InscricaoController
