'use strict'

class SessionController {
  async login({request, auth}) {
    const {email, password} = request.only([
      'email',
      'password'
    ])
    const token = await auth.attempt(email, password)

    return token
  }

  async checkToken({auth, response}) {
    try {
      await auth.check()
      response.status(200).send('logado')
    } catch (error) {
      response.status(401).send('Token invalido')
    }
  }
}

module.exports = SessionController
