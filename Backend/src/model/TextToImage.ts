import { Hono } from "hono";
import axios from "axios";
import { config } from 'dotenv';
import cloudinary from "../../cloudinaryConfig";
import { addImageToTracking } from "../context";

config();

const apiKey = process.env.HUGGING_FACE_API_KEY;
const model = process.env.MODEL_ID;

const textToImageRoute = new Hono();


textToImageRoute.post("/texttoimage", async (c) => {
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

textToImageRoute.post('/avatar', async (c) => {
    const { email, prompt, imageBase64} = await c.req.json();

    return c.json({ message: 'Avatar API is under maintenance and your prompt is: ', prompt });
});


export default textToImageRoute;