
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BadRequest from 'App/Exceptions/BadRequestException'
import Cliente from 'App/Models/Cliente'
import ContaCorrente from 'App/Models/ContaCorrente'

export default class ContaController {

    public async criarContaClienteExistente({ response, request }: HttpContextContract){  
        
        const  clientePayload = request.only(['nome_completo', 'data_nascimento', 'cpf', 'email'])
        const verificar = await Cliente.query()
        .where('nome_completo', clientePayload.nome_completo)
        .where('cpf', clientePayload.cpf)
        .where('email', clientePayload.email)

        if( Object.values(verificar).length == 1 ){
            const contaPayload = request.only(['senha', 'conta', 'agencia', 'saldo'])
            const conta = await ContaCorrente.create({
                idcliente: verificar[0].id,
                senha: contaPayload.senha,
                conta: contaPayload.conta,
                agencia: contaPayload.agencia,
                saldo: contaPayload.saldo,
            })
            return response.created({ conta })
        } else throw new BadRequest('dados de cliente inválidos', 401)

    }

    public async criarContaClienteInexistente({response, request}: HttpContextContract){
        const clientePayload = request.only(['nome_completo', 'data_nascimento', 'cpf', 'email'])
        const contaPayload = request.only(['senha', 'conta', 'agencia', 'saldo'])
        const cliente = await Cliente.create(clientePayload)
        const conta = await ContaCorrente.create({
            idcliente: cliente.id,
            senha: contaPayload.senha,
            conta: contaPayload.conta,
            agencia: contaPayload.agencia,
            saldo: contaPayload.saldo,
        })
        return response.created({ cliente, conta })
    }

}