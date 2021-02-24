'use strict'
const Calculo = use('App/Models/Calculo')
const Inscricao = use('App/Models/Inscricao')
const Pss = use('App/Models/Pss')
const Vaga = use('App/Models/Vaga')
const User = use('App/Models/User')
const Helpers = use('Helpers')
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
  async index({request, response, view}) {
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
  async create({request, response, view}) {
  }

  /**
   * Create/save a new calculo.
   * POST calculos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({request, response, auth}) {
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
  async show({params, request, response, view}) {
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
    await this.gerarPdf(inscricao, parcial, total)

    response.status(200).send({inscricao, parcial, total})
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
  async edit({params, request, response, view}) {
  }

  /**
   * Update calculo details.
   * PUT or PATCH calculos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({params, request, response}) {
  }

  /**
   * Delete a calculo with id.
   * DELETE calculos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({params, request, response}) {
  }

  async calcularTitulo(titulo, calculo) {
    const parcial = titulo ? titulo * calculo.pontuacao : 0
    const valor = parcial < calculo.pontuacaoMax ? parcial : calculo.pontuacaoMax

    return valor
  }

  async calcularTotal(parcial) {
    let total = 0
    for (let parc in parcial) {
      total = total + parcial[parc].total
    }
    return total
  }

  async gerarPdf(inscricao, parcial, total) {
    const pss = await Pss.find(inscricao.pss_id)
    const vaga = await Vaga.find(inscricao.vaga_id)
    const user = await User.find(inscricao.user_id)
    const PDFKit = require('pdfkit');
    const fs = require('fs');

    const pdf = new PDFKit();
    pdf.image(Helpers.tmpPath('brasao.png'), 65, 60, {fit: [80, 80]})
    pdf.fontSize('20')
      .text('Prefeitura Municipal de Tibagi', {align: 'center'})
    pdf.fontSize('16')
      .text('Processo seletivo Nº ' + pss.nrEditalConcurso + '/' + pss.anoEditalConcurso, {align: 'center'})
    pdf.fontSize('15')
      .text(vaga.nmVaga, {align: 'center'})

    var yInicial = 195
    var hInicial = 18

    pdf.text(user.nmPessoa, 70, yInicial + 3, {fit: [80, 80], align: 'center'})
      .rect(65, yInicial, 500, hInicial)
      .stroke()
    yInicial = yInicial + hInicial
    pdf.text('CPF: ' + user.nrDocumento, 70, yInicial + 3, {fit: [80, 80]})
      .rect(65, yInicial, 500, hInicial)
      .stroke()
    yInicial = yInicial + hInicial
    pdf.text('E-mail: ' + user.email, 70, yInicial + 3, {fit: [80, 80]})
      .rect(65, yInicial, 500, hInicial)
      .stroke()
    const nascimento = new Date(user.dataNascimento)
    pdf.text('Data de nascimento: ' + nascimento.getDate() + '/' + (nascimento.getMonth() + 1) + '/' + nascimento.getFullYear(), 70, yInicial + 3, {fit: [80, 80]})
      .rect(65, yInicial, 500, hInicial)
      .stroke()
    yInicial = yInicial + 100
    pdf.text('Titulo', 70, yInicial + 3, {fit: [80, 80]})
      .rect(65, yInicial, 500, hInicial)
      .stroke()
    pdf.text('Pontuação', 469, yInicial + 3, {fit: [80, 80]})
      .rect(65, yInicial, 500, hInicial)
      .stroke()
    yInicial = yInicial + hInicial
    for (let parc in parcial) {
      pdf.text(parcial[parc].titulo, 70, yInicial + 3, {fit: [80, 80]})
        .rect(65, yInicial, 500, hInicial)
        .stroke()
      pdf.text(parcial[parc].total, 500, yInicial + 3, {fit: [80, 80]})
        .rect(65, yInicial, 500, hInicial)
        .stroke()
      yInicial = yInicial + hInicial
    }
    pdf.text('Total', 70, yInicial + 3, {fit: [80, 80]})
      .rect(65, yInicial, 500, hInicial)
      .stroke()
    pdf.text(total, 500, yInicial + 3, {fit: [80, 80]})
      .rect(65, yInicial, 500, hInicial)
      .stroke()
    const data = new Date()
    yInicial = yInicial + 100
    const dayName = new Array ("domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado")
    const monName = new Array ("janeiro", "fevereiro", "março", "abril", "maio", "junho", "agosto", "outubro", "novembro", "dezembro")
    pdf.text('Tibagi ' + dayName[data.getDay()] + ','+ data.getDate () + ' de ' + monName[(data.getMonth())] + ' de ' + data.getFullYear(), 70, yInicial + 3, {fit: [80, 80], align: 'center'})

    const arquivo = 'inscricao/' + inscricao.id + '.pdf'
    pdf.pipe(fs.createWriteStream(Helpers.tmpPath(arquivo)))
    pdf.end()
  }

  async download({params, response, auth}) {
    if(auth.user.isAdmin === 1) {
      response.download(Helpers.tmpPath('inscricao/' + params.id + '.pdf'))
    } else {
      const inscricao = await Inscricao.find(params.id)
      if (auth.user.id === inscricao.user_id) {
        response.download(Helpers.tmpPath('inscricao/' + params.id + '.pdf'))
      } else {
        response.status(401).send('Não autorizado')
      }
    }

  }
}

module.exports = CalculoController
