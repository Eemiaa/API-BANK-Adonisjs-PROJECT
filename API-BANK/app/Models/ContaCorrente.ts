import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ContaCorrente extends BaseModel {
  @column({ isPrimary: true })
  public id_conta: number

  @column()
  public id_agencia: number

  @column()
  public id_cliente: number

  @column()
  public senha: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
