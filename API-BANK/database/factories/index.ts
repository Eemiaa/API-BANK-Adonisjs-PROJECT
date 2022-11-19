import Factory from '@ioc:Adonis/Lucid/Factory'
import ContaCorrente from 'App/Models/ContaCorrente'

export const ContaFactory = Factory.define(ContaCorrente, ({ faker }) => {
    return {
        conta: parseInt(faker.finance.account(8)),
        agencia: parseInt(faker.finance.account(4)),
        senha: faker.internet.password(),
        saldo: parseFloat(faker.finance.amount(100.0, 1000.0)),
    }
}).build()