import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Cliente from './Cliente'

export default class Agencia extends BaseModel {
  
  @column({ isPrimary: true })
  public id: number

  @column()
  public agencia: number
  
  @hasOne(() => Cliente, {
    foreignKey: 'idagencia'
  })
  public cliente: HasOne<typeof Cliente>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
 
}

