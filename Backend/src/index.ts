import { Hono } from 'hono'
import userRoutes from './routes/userRoutes'
import { cors } from 'hono/cors';

const app = new Hono()
const routes = [userRoutes]

app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization']
}));

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

routes.forEach((route) => {
  app.route('/api', route)
})

export default app
