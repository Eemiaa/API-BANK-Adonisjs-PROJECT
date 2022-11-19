import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class LogAutenticacao extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_conta: number

  @column()
  public id_agencia: number

  @column()
  public data_autenticacao: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  
}
