import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'conta_correntes'

  public async up () {

    this.schema.createTable(this.tableName, (table) => {

      table.increments('id')
      table.string('conta').notNullable()
      table.integer('cliente_id').unsigned().references('id').inTable('clientes').notNullable()

      table.string('password').notNullable()
      table.float('saldo').defaultTo(100.0)

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
