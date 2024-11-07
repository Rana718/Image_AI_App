import { Hono } from 'hono'
import userRoutes from './routes/userRoutes'
import { cors } from 'hono/cors';
import modelAddRoute from './routes/ModelAdd'

const app = new Hono()
const routes = [userRoutes, modelAddRoute]

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
