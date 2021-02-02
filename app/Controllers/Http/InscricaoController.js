'use strict'
const Inscricao = use('App/Models/Inscricao')
const Vaga = use('App/Models/Vaga')
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

    const validation = await validate(data, rules,messages)
    if (validation.fails()) {
      return response.status(400).send(validation.messages())
    }
    const inscricao = Inscricao.create(data)
    return inscricao
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
  async destroy({params, request, response}) {
  }
}

module.exports = InscricaoController
