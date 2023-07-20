import fastify from "fastify";
import { env } from "./env"
import { usersRoutes } from "./routes/user";
import authController from './controllers/authController';

const app = fastify()


app.register(authController, {
  prefix: 'users'
})

app.listen({
  port: env.PORT,
}).then(() => {
    console.log('HTTP server Running!')
  })
