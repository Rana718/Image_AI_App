import { Hono } from 'hono'
import { cors } from 'hono/cors'
import mainRoute from './routes'
import { serve } from '@hono/node-server'
import { handle } from '@hono/node-server/vercel'

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
}))

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/api', routes)

// For local development
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 3500
  console.log(`Server is running on port ${port}`)
  
  serve({
    fetch: app.fetch,
    port: Number(port),
  })
}

// For Vercel deployment
export default handle(app)