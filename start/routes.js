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
  .middleware(new Map([
    [['index', 'update', 'destroy'], ['auth']]
  ]))
  .validator(new Map([
    [['user.store'], ['StoreUser']]
  ]))

Route.post('/login', 'SessionController.login').validator('SessionLogin')
Route.post('checktoken', 'SessionController.checkToken')

Route.resource('pss', 'PssController')
  .middleware(new Map([
    [['store', 'update', 'destroy'], ['auth', 'isAdmin']]
  ]))
  .validator(new Map([
    [['pss.store'], ['PssStore']]
  ]))

Route.get('vaga/pss/:id', 'VagaController.vagaPss')

Route.resource('vaga', 'VagaController')
  .middleware(new Map([
    [['store', 'update', 'destroy'], ['auth','isAdmin']]
  ]))
  .validator(new Map([
    [['vaga.store'], ['VagaStore']]
  ]))

Route.resource('inscricao', 'InscricaoController')
  .middleware('auth')
  .validator(new Map([
    [['inscricao.store'], ['InscricaoStore']]
  ]))

Route.resource('calculo', 'CalculoController')
  .middleware(new Map([
    [['store', 'update', 'destroy'], ['auth','isAdmin']]
  ]))
  .validator(new Map([
    [['calculo.store'], ['CalculoStore']]
  ]))
