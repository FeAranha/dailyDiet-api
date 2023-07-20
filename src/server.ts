import fastify from "fastify";
import { env } from "./env"
import { usersRoutes } from "./routes/user";

const app = fastify()

app.register(usersRoutes, {
  prefix: 'users'
})

app.listen({
  port: env.PORT,
}).then(() => {
    console.log('HTTP server Running!')
  })
