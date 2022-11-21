import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Transacao extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_conta_destino: number

  @column()
  public id_conta_origem: number

  @column()
  public natureza: string

  @column()
  public empresa: string

  @column()
  public servico: string

  @column()
  public valor: number
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}
