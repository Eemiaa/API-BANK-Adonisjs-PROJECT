import { DateTime } from 'luxon'
import { BaseModel, beforeSave, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Cliente from './Cliente'
import Transacao from './Transacao'
import Hash from '@ioc:Adonis/Core/Hash'


export default class ContaCorrente extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public conta: number

  @column({columnName: 'cliente_id'})
  public idcliente: number

  @column({ serializeAs: null })
  public password: string

  @column()
  public saldo:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Cliente, {
    foreignKey: 'idcliente'
  })
  public cliente: BelongsTo<typeof Cliente>

  @hasMany(() => Transacao, {
    foreignKey: 'idContaOrigem'
  })
  public transacoesOrigem: HasMany<typeof Transacao>

  @hasMany(() => Transacao, {
    foreignKey: 'idContaDestino'
  })
  public transacoesDestino: HasMany<typeof Transacao>

  @beforeSave()
  public static async hashPassword(conta: ContaCorrente){
    if (conta.$dirty.password) conta.password = await Hash.make(conta.password)
  }
}
