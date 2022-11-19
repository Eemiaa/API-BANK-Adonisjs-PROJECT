import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'transacaos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('id_conta_origem').unsigned().references('id').inTable('conta_correntes').notNullable()
      table.integer('id_conta_destino').unsigned().references('id').inTable('conta_correntes').notNullable()

      table.string('natureza').notNullable()
      table.string('empresa').defaultTo('-')
      table.string('servico').defaultTo('-')
      table.string('valor').notNullable()
      table.string('data').notNullable()


      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
