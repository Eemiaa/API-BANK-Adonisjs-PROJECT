import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BadRequest from 'App/Exceptions/BadRequestException'
import Agencia from 'App/Models/Agencia'
import Cliente from 'App/Models/Cliente'
import ContaCorrente from 'App/Models/ContaCorrente'
import LogAutenticacao from 'App/Models/LogAutenticacao'

export default class SessaosController {

    public async loginConta({ request, response, auth }: HttpContextContract){
        const Payload = request.only(['agencia', 'conta', 'senha'])

        const buscarConta =  (conta, cliente) => {
            for (let i = 0; true ; i++){
                if(cliente[i].id === conta?.idcliente){
                    return i
                }               
            } 
        }
        const agencia = await Agencia.findBy('agencia', Payload.agencia)
        //A agência existe?
        if(agencia){
            const conta = await ContaCorrente.findBy('conta', Payload.conta)
            if(conta){
                const cliente = await Cliente.query().where('idagencia', agencia.id)
                const indice = await buscarConta(conta, cliente)
                //A conta corrente existe na agência?
                if(cliente[indice].id === conta?.idcliente){

                    await LogAutenticacao.create({
                        idagencia:agencia.id,
                        idconta:conta.id,
                    })
                    
                    const token = await auth.use('api').attempt(Payload.conta, Payload.senha)   

                    return response.created({
                        code:201,
                        message:'O cliente foi autenticado com sucesso!',
                        conta: auth.user,
                        token,
                    })
                    //
                }else throw new BadRequest('Conta Corrente não existe na agência', 401)
            }else throw new BadRequest('Conta Corrente Inexistente', 401)
        }else throw new BadRequest('Agência Inexistente', 401)
    }
    public async logoutConta({ response, auth }: HttpContextContract){

        await auth.use('api').logout()
        return response.ok({
            code: 200,
            message:"O logout foi efetuado com sucesso!"})
        
    }
}
