import { FastifyInstance } from "fastify"
import { knex } from "../database"
import { z } from "zod"
import { randomUUID } from "node:crypto"

export async function usersRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    const users = await knex('users').select('*')

    return users
  })

  app.get('/:id', async (request) => {
    const getUsersParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getUsersParamsSchema.parse(request.params)

    const transaction = await knex('users').where('id', id).first()

    return {
      transaction,
    }
  })

  app.post('/', async (request, reply) => {
    const createUserBodySchema = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
    })

    const { name, email, password } = createUserBodySchema.parse(request.body)

    await knex('users').insert({
      id: randomUUID(),
      name,
      email,
      password,
    })

    return reply.status(201).send()
  })
}