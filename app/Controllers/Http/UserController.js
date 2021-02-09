'use strict'

const User = use('App/Models/User')

class UserController {
  async index ({auth}) {
    if (auth.user.isAdmin === 1){
      const user = await  User.all()
      return user
    } else {
      const user = await  User.find(auth.user.id)
      return user
    }

  }

  async store ({request, auth}) {
    const data = request.only([
      'email',
      'password',
      'nrDocumento',
      'nmPessoa',
      'flPNE',
      'flAfrodescendente',
      'flIndio',
      'dataNascimento',
      'endereco',
      'nrEndereco'
    ])
    const user = await User.create(data)
    const token = await auth.generate(user)
    return token
  }
}

module.exports = UserController
