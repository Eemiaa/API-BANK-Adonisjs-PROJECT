import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import ContaCorrente from './ContaCorrente'


export default class Cliente extends BaseModel {

  @column({ isPrimary: true })
  public id: number
  
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


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}
