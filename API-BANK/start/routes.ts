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

Route.group(() => {

    Route.post('/criarContaUsuarioExistente', 'ContaController.criarContaClienteExistente')
    Route.post('/criarContaUsuarioInexistente', 'ContaController.criarContaClienteInexistente')
    
    Route.post('/sessaoLogin', 'SessaosController.loginConta')
    Route.delete('/sessaoLogout', 'SessaosController.logoutConta')
    
    Route.get('/consultarSaldo', 'ContaController.consultarSaldoConta')
    Route.post('/consultarExtrato', 'TransacaosController.consultarExtratoConta')
    
    Route.post('/comprarGiftCard', 'TransacaosController.comprarGiftCard')
    Route.post('/realizarTransferencia', 'TransacaosController.realizarTransferencia')

}).prefix('/api')



