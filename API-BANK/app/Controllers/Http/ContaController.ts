
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BadRequest from 'App/Exceptions/BadRequestException'
import Cliente from 'App/Models/Cliente'
import ContaCorrente from 'App/Models/ContaCorrente'
import Agencia from 'App/Models/Agencia'

export default class ContaController {
    
    public async criarContaClienteExistente({ response, request }: HttpContextContract){  
        const digitosIguais = (senha) => {
            const numeros = {0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0}
            for (let i = 0; i<senha.length; i++){
                if(senha[i] in numeros){
                    numeros[senha[i]] += 1 
                    if(numeros[senha[i]]>1){
                        return true
                    }}}
            return false
        } 
        const clientePayload = request.only(['nome_completo', 'data_nascimento', 'cpf', 'email'])
        const verificar = await Cliente.query()
        .where('nome_completo', clientePayload.nome_completo)
        .where('cpf', clientePayload.cpf)
        .where('email', clientePayload.email)

        //condição de dados em uso
        if( Object.values(verificar).length == 1 ){
            const contaPayload = request.only(['senha'])

            if (!digitosIguais(contaPayload.senha) && contaPayload.senha.length == 6){
                const conta_numero = Math.floor(Math.random() * ((1000000) + 100000))
                const conta = await ContaCorrente.create({
                    idcliente: verificar[0].id,
                    password: contaPayload.senha,
                    conta: conta_numero,
                })
                const agencia = await Agencia.findBy('id', verificar[0].idagencia)

                return response.created({
                    code: 201,
                    message: 'Conta criada com sucesso!',
                    conta:{
                        'Código da agência': agencia?.agencia,
                        'Número da conta': conta.conta
                    }
                })

            } else throw new BadRequest('senha inválida', 422)    
        } else throw new BadRequest('dados de cliente inválidos', 401)
    }

    public async criarContaClienteInexistente({response, request}: HttpContextContract){

        const digitosIguais = (senha) => {
            const numeros = {0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0}
            for (let i = 0; i<senha.length; i++){
                if(senha[i] in numeros){
                    numeros[senha[i]] += 1 
                    if(numeros[senha[i]]>1){
                        return true
                    }}}
            return false
        } 
        const clientePayload = request.only(['nome_completo', 'data_nascimento', 'cpf', 'email'])
        const verificar = await Cliente.query()
        .where('nome_completo', clientePayload.nome_completo)
        .where('cpf', clientePayload.cpf)
        .where('email', clientePayload.email)
  
        //condição de dados em uso
        if( Object.values(verificar).length == 1 ){
            throw new BadRequest('dados de cliente já em uso', 409)
        } else {
            const idade = (Date.now() - Date.parse(clientePayload.data_nascimento))/ (31557600000)
            //condição de idade
            if (idade > 17){
                const contaPayload = request.only(['senha'])
                //condição de senha
                if (!digitosIguais(contaPayload.senha) && contaPayload.senha.length == 6){
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
                        password: contaPayload.senha,
                        conta: conta_numero,
                    })
                    return response.created({
                        code: 201,
                        message: 'Conta criada com sucesso!',
                        conta:{
                            'Código da agência': agencia[agencia_indice].agencia,
                            'Número da conta': conta.conta
                        }
                    })
                }else throw new BadRequest('senha inválida', 422)    
            }else throw new BadRequest('cliente não possui idade para abertura de conta corrente', 422)
        }
    }

    public async consultarSaldoConta({auth, response}: HttpContextContract){
        
        try{
            await auth.use('api').authenticate()
            const idcliente = await auth.user?.idcliente
            const conta = await ContaCorrente.findBy('id', idcliente)

            return response.send({
                code:200,
                saldo:conta?.saldo})
        } catch{

            throw new BadRequest('falha na autentição do cliente, token incorreto!', 403)

        }
        
        
        //const cont = 

        //const conta = await ContaCorrente.findOrFail(contaPayload.id)

        
        //return response.created(conta)


    }


}
