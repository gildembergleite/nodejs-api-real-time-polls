import { PrismaClient } from '@prisma/client';
import fastify from 'fastify';
import { z } from 'zod';

const app = fastify()
const prisma = new PrismaClient()

app.get('/hello', () => 'Hello world')

app.post('/polls', async (request, reply) => {
  const createPollBody = z.object({
    title: z.string()
  })

  const { title } = createPollBody.parse(request.body)

  const { id } = await prisma.poll.create({
    data: {
      title
    }
  })

  reply.status(201).send({ id: id })
})

app.listen({ port: 3333 }).then(() => {
  console.log('Server listening on port 3333')
})