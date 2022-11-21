import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import GiftCard from 'App/Models/GiftCard'

export default class extends BaseSeeder {
  public async run () {
    await GiftCard.createMany([
      { servico:'Celular',
        empresa:'VIVO'},
      { servico:'Celular',
        empresa:'CLARO'},
      { servico:'Celular',
        empresa:'TIM'},
      { servico:'Celular',
        empresa:'OI'},

      { servico:'Steam',
        empresa:'NEFTFLIX'},
      { servico:'Steam',
        empresa:'PRIME VIDEO'},
      { servico:'Steam',
        empresa:'DISNEY'},
      { servico:'Steam',
        empresa:'HBO MAX'},

      { servico:'Games',
        empresa:'XBOX'},
      { servico:'Games',
        empresa:'NINTENDO'},
      { servico:'Games',
        empresa:'STEAM'},

    ])
  }
}
