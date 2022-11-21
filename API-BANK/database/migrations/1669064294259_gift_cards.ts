import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'gift_cards'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('empresa')
      table.string('servico')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
