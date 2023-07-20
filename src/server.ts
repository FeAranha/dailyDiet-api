import fastify from "fastify";
import { env } from "./env"
import { knex } from "./database"

const app = fastify()

app.get('/hello', async() => {
  const user = await knex('users').select('*')

  return user
})

app.listen({
  port: env.PORT,
}).then(() => {
    console.log('HTTP server Running!')
  })
