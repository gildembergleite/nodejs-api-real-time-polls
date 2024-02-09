import { FastifyInstance } from 'fastify';
import { prisma } from '../../lib/prisma';

export async function getPolls(app: FastifyInstance) {
  app.get('/polls', async (_, reply) => {

  const polls = await prisma.poll.findMany({
    include: {
      options: {
        select: {
          id: true,
          title: true
        }
      }
    }
  })
    
  if (!polls) {
    return reply.status(400).send({ message: 'Polls not found' })
  }

  reply.send({ polls })
})
}