import { Knex } from 'knex';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar?: any;
  phone?: any;
  createdAt: Date;
}

// Exemplo de criação do modelo User para o banco de dados SQLite
export async function createUserModel(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('users'))) {
    await knex.schema.createTable('users', (table) => {
      table.uuid('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.text('phone').nullable()
      table.text('avatar').nullable()
      table.dateTime('createdAt').notNullable().defaultTo(knex.fn.now());
    });
  }
}

// Exemplo de função para inserir um usuário no banco de dados
export async function insertUser(knex: Knex, user: User): Promise<void> {
  await knex('users').insert(user);
}

// Exemplo de função para buscar um usuário pelo email no banco de dados
// export async function getUserByEmail(knex: Knex, email: string): Promise<User | undefined> {
//   return await knex('users').where('email', email).first();
// }
