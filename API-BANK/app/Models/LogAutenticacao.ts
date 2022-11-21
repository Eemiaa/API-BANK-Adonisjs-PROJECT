import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class LogAutenticacao extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public idconta: number

  @column()
  public idagencia: number

  @column.dateTime({ autoCreate: true })
  public data_autenticacao: DateTime



  
}
