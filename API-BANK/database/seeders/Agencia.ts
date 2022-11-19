import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Agencia from 'App/Models/Agencia'

export default class extends BaseSeeder {
  public async run () {
    await Agencia.createMany([
      { agencia:1234,},
      { agencia:2134,},
      { agencia:2143,},
      { agencia:2413,},
      { agencia:3412,},
    ])
  }
}
