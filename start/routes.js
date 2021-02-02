'use strict'
/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.resource('user', 'UserController')
  .validator(new Map([
    [['user.store'], ['StoreUser']]
  ]))
  .middleware(new Map([
    [['index'], ['auth']]
  ]))

Route.get('/login', 'SessionController.login').validator('SessionLogin')

Route.resource('pss', 'PssController')
  .validator(new Map([
    [['pss.store'], ['PssStore']]
  ]))

Route.resource('/vaga', 'VagaController')

Route.resource('/inscricao', 'InscricaoController')
