import { Hono } from "hono";
import { config } from "dotenv";
//@ts-expect-error
import FormData from 'form-data';
import axios from "axios";

config();

const modelRoute = new Hono();
const model = process.env.MODEL_ID;
const apiKey = process.env.HUGGING_FACE_API_KEY;
const rapid = process.env.RAPID_API_KEY;


modelRoute.post("/texttoimage", async (c) => {
    const { text } = await c.req.json();

    if (!text) {
        return c.json({ error: "Missing text or email" }, 400);
    }

    try {
        const url = `https://api-inference.huggingface.co/models/${model}`;
        const headers = {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
        };

        const response = await axios.post(url, { inputs: text }, { headers, responseType: 'arraybuffer' });
        const contentType = response.headers['content-type'] || 'application/octet-stream';

        if (response.status === 200 && contentType.startsWith("image/")) {
            return c.body(response.data, 200, {
                "Content-Type": contentType,
                "Content-Disposition": `attachment; filename="generated_image.png"`,
            });
        }
        const errorResponse = JSON.parse(Buffer.from(response.data).toString());
        return c.json({ error: "Non-image response from API", details: errorResponse }, 500);

    } catch (error) {
        console.error("Error processing image:", error);
        return c.json({ error: "Error processing image" }, 500);
    }
});




modelRoute.post('/imgupbg', async (c) => {
    const formData = await c.req.formData();
    const imageFile = formData.get('image') as File;
    const isremovebg = formData.get('isremovebg');
    const email = formData.get('email');

    if (!imageFile || !email || !isremovebg) {
        return c.json({ error: 'Image, email and isRemovebg are required' }, 400);
    }

    const app_url = isremovebg
        ? 'https://ai-background-remover.p.rapidapi.com/image/matte/v1'
        : 'https://ai-image-upscaler1.p.rapidapi.com/v1';

    const buffer = await imageFile.arrayBuffer();
    const data = new FormData();
    data.append('image', Buffer.from(buffer), imageFile.name);

    try {
        const response = await axios.post(
            app_url,
            data,
            {
                headers: {
                    'x-rapidapi-key': rapid,
                    'x-rapidapi-host': 'ai-image-upscaler1.p.rapidapi.com',
                    ...data.getHeaders(),
                },
            }
        );

        const base64Image = response.data.result_base64;
        return c.json({ upscaledImage: base64Image });
    } catch (error) {
        console.error('Error:', error);
        return c.json({ error: 'Failed to upscale image' }, 500);
    }
});

modelRoute.get('/mockup', async (c) => {
    return c.json({ message: 'Mockup API is under maintenance' });
})

modelRoute.post('/avatar', async (c) => {
    const formData = await c.req.formData();
    // const imageFile = formData.get('image') as File;
    // const email = formData.get('email');
    const prompt = formData.get('prompt');

    return c.json({ message: 'Avatar API is under maintenance and your prompt is: ',prompt });
})

export default modelRoute;
