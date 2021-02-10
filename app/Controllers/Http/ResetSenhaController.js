'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const User = use('App/Models/User')
const ResetSenha = use('App/Models/ResetSenha')
const randomString = require('randomstring')
const Mail = use('Mail')

/**
 * Resourceful controller for interacting with resetsenhas
 */
class ResetSenhaController {
  /**
   * Show a list of all resetsenhas.
   * GET resetsenhas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({request, response, view}) {
  }

  /**
   * Render a form to be used for creating a new resetsenha.
   * GET resetsenhas/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({request, response, view}) {
  }

  /**
   * Create/save a new resetsenha.
   * POST resetsenhas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({request, response}) {
    try {
      const {email} = request.only(['email'])
      const user = await User.findByOrFail('email', email)
      await ResetSenha.query().where('email', user.email).delete()
      const token = await ResetSenha.create({
        email: user.email,
        token: randomString.generate({length: 40})
      })

      await Mail.send('emails.recover', {user, token}, (message) => {
        message
          .from('sistema@tibagi.pr.gov.br', 'PSS')
          .to(email)
          .subject('Alteração de senha')
      })
      return token
    } catch (e) {
      if (e.code === 'E_MISSING_DATABASE_ROW') {
        response.status(400).send([{message: 'Email não encontrado'}])
      } else {
        response.status(400).send([{message: e.message}])
      }

      // response.status(400).send([{message: e }])
    }


  }

  async checkToken({request, response}) {
    try {
      const t = request.all()
      await ResetSenha.findByOrFail('token', t.token)
      response.status(200).send({data: {message: 'ok'}})
    } catch (e) {
      const t = request.all()
      response.status(401).send({data: {message: 'Não autorizado'}})
    }

  }

  /**
   * Display a single resetsenha.
   * GET resetsenhas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({params, request, response, view}) {
  }

  /**
   * Render a form to update an existing resetsenha.
   * GET resetsenhas/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({params, request, response, view}) {
  }

  /**
   * Update resetsenha details.
   * PUT or PATCH resetsenhas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({params, request, response}) {
    const reset = await ResetSenha.findByOrFail('token', request.input('token'))
    const user = await User.findByOrFail('email', reset.email)
    user.password = request.input('password')
    await user.save()
    await reset.delete()
    response.status(200).send({data: {message: 'ok'}})
  }

  /**
   * Delete a resetsenha with id.
   * DELETE resetsenhas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({params, request, response}) {
  }
}

module.exports = ResetSenhaController
