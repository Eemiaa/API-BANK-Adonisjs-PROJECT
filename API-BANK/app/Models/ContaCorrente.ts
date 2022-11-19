import { DateTime } from 'luxon'
import { BaseModel, beforeSave, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Cliente from './Cliente'
import Transacao from './Transacao'
import Hash from '@ioc:Adonis/Core/Hash'


export default class ContaCorrente extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: null })
  public conta: number

  @column()
  public agencia: number

  @column({columnName: 'cliente_id'})
  public idcliente: number

  @column()
  public senha: string

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
    if (conta.$dirty.senha) conta.senha = await Hash.make(conta.senha)
  }
}
