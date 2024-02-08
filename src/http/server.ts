import fastifyCookie from '@fastify/cookie';
import fastify from 'fastify';
import { createPoll } from './routes/create-poll';
import { getPoll } from './routes/get-poll';
import { voteOnPoll } from './routes/vote-on-poll';

const app = fastify()

app.register(fastifyCookie, {
  secret: process.env.COOKIE_SECRET,
  hook: 'onRequest'
})

app.register(createPoll)
app.register(getPoll)
app.register(voteOnPoll)

const port = process.env.PORT || 3333

app.listen({ port }).then(() => {
  console.log(`Server listening on port ${port}`)
})