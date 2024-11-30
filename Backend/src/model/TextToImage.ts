import { Hono } from "hono";
import axios from "axios";
import { config } from 'dotenv';
import { addImageToTracking } from "../context";
import { uploadToCloudinary } from "../util/cloudinaryUpload";

config();

const apiKey = process.env.HUGGING_FACE_API_KEY;
const model = process.env.MODEL_ID;

const textToImageRoute = new Hono();


textToImageRoute.post("/texttoimage", async (c) => {
    const { text, email } = await c.req.json();
    console.log(text);
    if (!text || !email) {
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
            const imageData = Buffer.from(response.data);
            const cloudinaryResponse = await uploadToCloudinary(imageData);

            addImageToTracking({
                email: email,
                publicId: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url,
            })
            console.log(cloudinaryResponse.secure_url);
            return c.body(cloudinaryResponse.secure_url, 200)
        }
        else{
            return c.json({ error: "Error processing image" }, 500);
        }
    } catch (error) {
        return c.json({ error: "Error processing image maybe due to rate limit" }, 500);
    }
});

textToImageRoute.post('/avatar', async (c) => {
    const { email, prompt, imageBase64} = await c.req.json();

    return c.json({ message: 'Avatar API is under maintenance and your prompt is: ', prompt });
});


export default textToImageRoute;