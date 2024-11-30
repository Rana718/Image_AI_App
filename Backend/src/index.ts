import { Hono } from 'hono'
import { cors } from 'hono/cors';
import mainRoute from './routes';

const app = new Hono()
const routes = mainRoute

app.use('*', async (c, next) => {
  try {
    await next()
  } catch (error) {
    console.error('Error:', error)
    return c.json({ error: 'Internal Server Error' }, 500)
  }
})

app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'application/json']
}));

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/api',routes)

export default app;
