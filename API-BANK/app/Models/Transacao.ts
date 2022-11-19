import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import ContaCorrente from './ContaCorrente'

export default class Transacao extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'id_conta_origem'})
  public idContaOrigem: number

  @column({ columnName: 'id_conta_origem'})
  public idContaDestino: number
  
  @column()
  public natureza: string

  @column()
  public empresa: string

  @column()
  public servico: string

  @column()
  public valor: number
  
  @column()
  public data: DateTime
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => ContaCorrente, {
    foreignKey: 'idContaOrigem',
  })
  public contaOrigem: BelongsTo<typeof ContaCorrente>

  @belongsTo(() => ContaCorrente, {
    foreignKey: 'idContaDestino',
  })
  public contaDestino: BelongsTo<typeof ContaCorrente>

}
