/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

//Route.group(() => {
//}).prefix('/api')


Route.post('/conta_corrente_usuario_existente', 'ContaController.criarContaClienteExistente')
Route.post('/conta_corrente_usuario_inexistente', 'ContaController.criarContaClienteInexistente')

Route.post('/sessao', 'SessaosController.loginConta')
Route.delete('/sessao', 'SessaosController.logoutConta')

Route.post('/consultarsaldo', 'ContaController.consultarSaldoConta')
Route.get('/consultarExtrato', 'TransacaosController.consultarExtratoConta')

Route.post('/comprarGiftCard', 'TransacaosController.comprarGiftCard')
Route.post('/realizarTransferencia', 'TransacaosController.realizarTransferencia')
