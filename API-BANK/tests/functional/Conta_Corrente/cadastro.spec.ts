import { test } from '@japa/runner'


test.group('Conta Corrente cadastro', () => {


  test('201: deve criar uma conta com cliente inexistente', async ({ client }) => {
    const Payload = {
      nome_completo: 'teste',
      data_nascimento: '2003/07/22',
      cpf: '234.567.678.23',
      email: 'teste@teste.com',

      senha: 'teste',
      conta: 1234,
      agencia: 4003,
      saldo: 200.0,
    }
    
    
    const response = await client.post('/api/conta_corrente_usuario_inexistente').json( Payload )
    
    const { senha, conta, agencia, saldo, ...clientePayload} = Payload
    const { nome_completo, data_nascimento, cpf, email, ...contaPayload } = Payload

    response.assertStatus(201)
    response.assertBodyContains({ 
      cliente: clientePayload,
      conta: contaPayload,
    })

 })

 test('201: deve criar uma conta com cliente existente', async ({ client }) => {
    const Payload = {
      nome_completo: 'teste',
      data_nascimento: '2003/07/22',
      cpf: '234.567.678.23',
      email: 'teste@teste.com',
      
      senha: 'teste',
      conta: 1234,
      agencia: 4003,
      saldo: 200.0,
    }
    const response = await client.post('/api/conta_corrente_usuario_existente').json(Payload)

    //const { nome_completo, data_nascimento, cpf, email, ...contaPayload } = Payload

    response.assertStatus(200)
    /*response.assertBodyContains({ 

      conta: contaPayload,
    })*/
  })

  })
  