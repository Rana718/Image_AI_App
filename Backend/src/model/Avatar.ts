import { Hono } from "hono";

const avatarRoute = new Hono();

avatarRoute.post('/avatar', async (c) => {
    const { email, prompt, imageBase64} = await c.req.json();

    return c.json({ message: 'Avatar API is under maintenance and your prompt is: ', prompt });
});


export default avatarRoute;