
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BadRequest from 'App/Exceptions/BadRequestException'
import Cliente from 'App/Models/Cliente'
import ContaCorrente from 'App/Models/ContaCorrente'
import Agencia from 'App/Models/Agencia'

export default class ContaController {

    public async criarContaClienteExistente({ response, request }: HttpContextContract){  
        
        const clientePayload = request.only(['nome_completo', 'data_nascimento', 'cpf', 'email'])
        const verificar = await Cliente.query()
        .where('nome_completo', clientePayload.nome_completo)
        .where('cpf', clientePayload.cpf)
        .where('email', clientePayload.email)

        if( Object.values(verificar).length == 1 ){
            const contaPayload = request.only(['senha', 'saldo'])
            const conta_numero = Math.floor(Math.random() * ((1000000) + 100000))
            const conta = await ContaCorrente.create({
                idcliente: verificar[0].id,
                senha: contaPayload.senha,
                conta: conta_numero,
            })
            return response.created(conta.conta, )
        } else throw new BadRequest('dados de cliente inválidos', 401)
    }

    public async criarContaClienteInexistente({response, request}: HttpContextContract){
        const clientePayload = request.only(['nome_completo', 'data_nascimento', 'cpf', 'email'])
        const verificar = await Cliente.query()
        .where('nome_completo', clientePayload.nome_completo)
        .where('cpf', clientePayload.cpf)
        .where('email', clientePayload.email)
  
        if( Object.values(verificar).length == 1 ){
            throw new BadRequest('dados de cliente já em uso', 409)
        } else {
            const contaPayload = request.only(['senha'])
            const idade = (Date.now() - Date.parse(clientePayload.data_nascimento))/ (31557600000)
            
            if (idade > 17){
                const agencia = await Agencia.all()
                const agencia_indice = Math.floor(Math.random() * ((agencia.length) + 0))
                const cliente = await Cliente.create({
                    idagencia: agencia[agencia_indice].id,
                    nome_completo: clientePayload.nome_completo,
                    data_nascimento: clientePayload.data_nascimento,
                    cpf: clientePayload.cpf,
                    email: clientePayload.email,
                })
                const conta_numero = Math.floor(Math.random() * ((1000000) + 100000))
                const conta = await ContaCorrente.create({
                    idcliente: cliente.id,
                    senha: contaPayload.senha,
                    conta: conta_numero,
                })
                return response.created(conta.conta)
            }else throw new BadRequest('cliente não possui idade para abertura de conta corrente', 422)
        }
}
}
