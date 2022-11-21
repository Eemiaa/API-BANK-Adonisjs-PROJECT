import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import BadRequest from 'App/Exceptions/BadRequestException'
import Agencia from 'App/Models/Agencia'
import Cliente from 'App/Models/Cliente'
import ContaCorrente from 'App/Models/ContaCorrente'
import Transacao from 'App/Models/Transacao'

export default class TransacaosController {

    public async consultarExtratoConta({ auth, response, request }: HttpContextContract){
        const autenticacao =  await auth.use('api').authenticate()
        if(autenticacao){
            const date = request.only(['data_inicial', 'data_final'])
            var data_inicial = new Date(date.data_final)
            var data_final = new Date(date.data_inicial)
            if(data_final && data_inicial){
                if(data_final.getDay() <= data_inicial.getDay() && auth.user?.id ){
                    try{
                        const requisicao = await Transacao.query().where('id_conta_origem', auth.user.id).where('created_at', '<=', data_inicial).andWhere('created_at', '>=', data_final)
                        let resposta = new Array
                        for(let i=0; i < requisicao.length; i++){
                            resposta.push({
                            'data da movimentação':requisicao[i].createdAt,
                            'valor':requisicao[i].valor,
                            'natureza':requisicao[i].natureza,
                        })
                        }
                        return response.ok(resposta)
                    }catch{
                    }return response.send({code: 200, message:'Não foi encontrada nenhuma transação.'})
                }else throw new BadRequest('Data final deve ser igual ou maior que a Data Inicial!', 422)
            }else throw new BadRequest('Formato de data inválido!', 401)
        }else throw new BadRequest('Falha na autentição do cliente, token incorreto!', 403)
    }

    public async comprarGiftCard({}: HttpContextContract){
    }

    public async realizarTransferencia({auth, response, request}: HttpContextContract){
        const buscarConta =  (conta, cliente) => {
            for (let i = 0; true ; i++){
                if(cliente[i].id === conta?.idcliente){
                    return i
                }               
            } 
        }
        const autenticacao =  await auth.use('api').authenticate()

        if(autenticacao){
            const transferencia = request.only(['valor_transferencia', 'agencia', 'conta'])
            const agenciaDestino = await Agencia.findBy('agencia', transferencia.agencia)
            if(agenciaDestino){
                const contaDestino = await ContaCorrente.findBy('conta', transferencia.conta)
                if(contaDestino){
                    const clienteDestino = await Cliente.query().where('idagencia', agenciaDestino.id)
                    const indice = await buscarConta(contaDestino, clienteDestino)
                    if(clienteDestino[indice].id === contaDestino?.idcliente){
                        if( auth.user?.saldo && auth.user.saldo >= transferencia.valor_transferencia){
                            //logs
                            await Transacao.create({
                                id_conta_origem: auth.user.id,
                                id_conta_destino: contaDestino.id,
                                natureza: '-',
                                valor: transferencia.valor_transferencia,
                            })
                            await Transacao.create({
                                id_conta_origem: contaDestino.id,
                                id_conta_destino: auth.user.id,
                                natureza: '+',
                                valor: transferencia.valor_transferencia,
                            })
                            //updates
                            auth.user.saldo = Math.fround(auth.user.saldo) - Math.fround(transferencia.valor_transferencia)
                            contaDestino.saldo = Math.fround(contaDestino.saldo) + Math.fround(transferencia.valor_transferencia)
                            await auth.user.save()
                            await contaDestino.save()
                            return response.ok(auth.user.saldo)
                        }else throw new BadRequest('Saldo insuficiente', 400)   
                    }else throw new BadRequest('Conta Corrente não existe na agência', 401)
                }else throw new BadRequest('Conta de destino Inexistente!', 401)
            }else throw new BadRequest('Agência de destino Inexistente!', 401)
        }else throw new BadRequest('falha na autentição do cliente, token incorreto!', 403)
    }
}
