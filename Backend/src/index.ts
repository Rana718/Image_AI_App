import { Hono } from 'hono'
import mainRoute from './routes';

const app = new Hono()
const routes = mainRoute

// Custom CORS middleware
app.use('*', async (c, next) => {
  // Add CORS headers
  c.header('Access-Control-Allow-Origin', '*')
  c.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, application/json')
  
  // Handle OPTIONS request
  if (c.req.method === 'OPTIONS') {
    return new Response(null, { status: 204 })
  }
  
  await next()
})

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/api', routes)

export default app.fetch;
