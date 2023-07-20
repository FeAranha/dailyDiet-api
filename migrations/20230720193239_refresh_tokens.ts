import { Knex } from "knex"


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('refresh_tokens', (table) => {
    table.text('id').notNullable().primary()
    table.integer('expires_in').notNullable()
    table.text('user_id').notNullable()
    table.text('token').notNullable()
    table.dateTime('created_at').notNullable().defaultTo(knex.fn.now())

    table.foreign('user_id').references('users.id').onDelete('RESTRICT').onUpdate('CASCADE')
  })

  await knex.schema.alterTable('refresh_tokens', (table) => {
    table.unique('user_id')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('refresh_tokens')
}

