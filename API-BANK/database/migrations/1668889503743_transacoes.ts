import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'transacaos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('id_conta_origem').notNullable()
      table.integer('id_conta_destino').notNullable()

      table.string('natureza').notNullable()
      table.string('empresa').defaultTo('-')
      table.string('servico').defaultTo('-')
      table.float('valor').notNullable()
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}