import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'clientes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('nome_completo').notNullable().unique()
      table.string('email').notNullable().unique()
      table.string('cpf').notNullable().unique()
      table.date('data_nascimento').notNullable()
      table.integer('agencia_id').unsigned().references('id').inTable('agencias').notNullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}