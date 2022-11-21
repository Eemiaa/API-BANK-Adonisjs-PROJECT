import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class GiftCard extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public empresa: string

  @column()
  public servico: string
}
