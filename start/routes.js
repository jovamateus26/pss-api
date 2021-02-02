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

Route.get('/login', 'SessionController.login').validator('SessionLogin')

Route.resource('pss', 'PssController')
  .middleware(new Map([
    [['store', 'update', 'destroy'], ['auth']]
  ]))
  .validator(new Map([
    [['pss.store'], ['PssStore']]
  ]))

Route.resource('vaga', 'VagaController')
  .middleware(new Map([
    [['store', 'update', 'destroy'], ['auth']]
  ]))
  .validator(new Map([
    [['vaga.store'], ['VagaStore']]
  ]))

Route.resource('inscricao', 'InscricaoController')
  .middleware('auth')
  .validator(new Map([
    [['inscricao.store'], ['InscricaoStore']]
  ]))
