import fastify from "fastify";
import crypto from 'node:crypto'
import { knex } from "./database"

const app = fastify()

app.get('/hello', async() => {
  const user = await knex('users').select('*')

  return user
})

app.listen({
  port: 3333,
}).then(() => {
    console.log('HTTP server Running!')
  })
