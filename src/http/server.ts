import fastifyCookie from '@fastify/cookie';
import fastifyWebsocket from '@fastify/websocket';
import fastify from 'fastify';
import { createPoll } from './routes/create-poll';
import { getPoll } from './routes/get-poll';
import { getPolls } from './routes/get-polls';
import { voteOnPoll } from './routes/vote-on-poll';
import { pollResults } from './ws/poll-results';

const app = fastify()

app.register(fastifyCookie, {
  secret: process.env.COOKIE_SECRET,
  hook: 'onRequest'
})

app.register(fastifyWebsocket)

app.register(createPoll)
app.register(getPolls)
app.register(getPoll)
app.register(voteOnPoll)
app.register(pollResults)

const port = process.env.PORT || 3333

app.listen({ port }).then(() => {
  console.log(`Server listening on port ${port}`)
})