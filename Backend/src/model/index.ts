import { Hono } from "hono";
import { config } from "dotenv";
//@ts-expect-error
import FormData from 'form-data';
import axios from "axios";
//@ts-expect-error
import fs from 'fs';
//@ts-expect-error
import path from 'path';

config();

const modelRoute = new Hono();
const model = process.env.MODEL_ID;
const apiKey = process.env.HUGGING_FACE_API_KEY;
const rapid = process.env.RAPID_API_KEY;


modelRoute.post("/texttoimage", async (c) => {
    const { text } = await c.req.json();
    console.log(text);
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
    const { imageBase64, isremovebg } = await c.req.json();

    const app_url = isremovebg === 'true'
        ? 'https://ai-background-remover.p.rapidapi.com/image/matte/v1'
        : 'https://ai-image-upscaler1.p.rapidapi.com/v1';

    const buffer = Buffer.from(imageBase64, 'base64');
    const tempDir = path.join('uploads');

    // Ensure the 'uploads' directory exists
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
    }

    const tempFilePath = path.join(tempDir, 'temp-image.jpg');
    fs.writeFileSync(tempFilePath, buffer);

    const formData = new FormData();
    formData.append('image', fs.createReadStream(tempFilePath));

    try {
        const response = await axios.post(
            app_url,
            formData,
            {
                headers: {
                    'x-rapidapi-key': process.env.RAPID_API_KEY,
                    'x-rapidapi-host': isremovebg === 'true'
                        ? 'ai-background-remover.p.rapidapi.com'
                        : 'ai-image-upscaler1.p.rapidapi.com',
                    ...formData.getHeaders(),
                },
                responseType: 'arraybuffer',
            }
        );

        return c.body(response.data, 200);
    } catch (error) {
        console.error('Error:', error);
        return c.json({ error: 'Failed to process image' }, 500);
    } finally {
        fs.unlinkSync(tempFilePath);
    }
});

modelRoute.get('/mockup', async (c) => {
    return c.json({ message: 'Mockup API is under maintenance' });
})

modelRoute.post('/avatar', async (c) => {
    const { email, prompt, imageBase64} = await c.req.json();

    return c.json({ message: 'Avatar API is under maintenance and your prompt is: ', prompt });
})

export default modelRoute;
