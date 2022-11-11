import { test } from '@japa/runner'


test.group('Conta Corrente cadastro', () => {

  /*group.each.setup(async () => {

    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })*/
  

  test('201: it should create a checking account', async ({ client }) => {
    const userPayload = {
      nome_cliente: 'teste',
      data_nascimento_cliente: '22/07/2003',
      cpf_cliente: '234.567.678.23',
      email_cliente: 'teste@teste.com',
    }
    const response = await client.post('/api/conta_corrente').json(userPayload)

    response.assertStatus(201)
    response.assertBodyContains({})

  })
})