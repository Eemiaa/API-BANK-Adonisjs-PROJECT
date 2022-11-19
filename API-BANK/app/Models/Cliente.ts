import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import ContaCorrente from './ContaCorrente'
import Agencia from './Agencia'

export default class Cliente extends BaseModel {

  @column({ isPrimary: true })
  public id: number

  @column({columnName: 'agencia_id'})
  public idagencia: number

  @column()
  public nome_completo: string

  @column()
  public email: string
  
  @column()
  public cpf: string
  
  @column()
  public data_nascimento: Date

  @hasMany(() => ContaCorrente, {
    foreignKey: 'idcliente'
  })
  public contascorrente: HasMany<typeof ContaCorrente>

  @belongsTo(() => Agencia, {
    foreignKey: 'idagencia'
  })
  public agencia: BelongsTo<typeof Agencia>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}
