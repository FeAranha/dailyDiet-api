import { FastifyInstance } from 'fastify';
import bcrypt from 'bcrypt';
import { Knex } from 'knex';
import { User } from '../models/User';
import { generateAccessToken, generateRefreshToken } from '../services/authService';

export default function authController(app: FastifyInstance, knex: Knex) {
  // Rota para realizar o login
  app.post('/login', async (request, reply) => {
    try {
      const { email, password } = request.body;

      // Buscar o usuário pelo email
      const user: User = await knex('users').where('email', email).first();

      // Verificar se o usuário existe e a senha está correta
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return reply.status(401).send({ message: 'Credenciais inválidas' });
      }

      // Gerar os tokens de acesso e refresh
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      // Salvar o refresh token no banco de dados
      await knex('refresh_tokens').insert({
        id: refreshToken,
        expiresIn: 7 * 24 * 60 * 60, // 7 dias em segundos
        userId: user.id,
        token: refreshToken,
      });

      return reply.status(200).send({ accessToken, refreshToken });
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return reply.status(500).send({ message: 'Erro ao fazer login' });
    }
  });
}
