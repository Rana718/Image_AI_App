import { Hono } from "hono";
import { config } from "dotenv";
//@ts-expect-error
import FormData from 'form-data';
import axios from "axios";
import * as fs from 'fs';
import * as path from 'path';
//@ts-expect-error
import cloudinary from 'cloudinary';
import { ImageTracking } from "../../types";
config();

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const modelRoute = new Hono();
const model = process.env.MODEL_ID;
const apiKey = process.env.HUGGING_FACE_API_KEY;
const rapid = process.env.RAPID_API_KEY;
const imageTracking: ImageTracking = {};

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
    const { imageBase64, isremovebg, email } = await c.req.json();

    const app_url = isremovebg === 'true' ? 'https://ai-background-remover.p.rapidapi.com/image/matte/v1' : 'https://ai-image-upscaler1.p.rapidapi.com/v1';

    const rapiapi_host = isremovebg === 'true' ? 'ai-background-remover.p.rapidapi.com' : 'ai-image-upscaler1.p.rapidapi.com';
    const buffer = Buffer.from(imageBase64, 'base64');
    const tempDir = path.join('uploads');

    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
    }

    const tempFilePath = path.join(tempDir, 'temp-image.jpg');
    //@ts-expect-error
    fs.writeFileSync(tempFilePath, buffer);

    const formData = new FormData();
    formData.append('image', fs.createReadStream(tempFilePath));

    try {
        const response = await axios.post(
            app_url,
            formData,
            {
                headers: {
                    'x-rapidapi-key': rapid,
                    'x-rapidapi-host': rapiapi_host,
                    ...formData.getHeaders(),
                },
                responseType: 'arraybuffer',
            }
        );

        const cloudinaryResponse = await new Promise<cloudinary.UploadApiResponse>((resolve, reject) => {
            const uploadStream = cloudinary.v2.uploader.upload_stream(
                { resource_type: 'image' },
                //@ts-expect-error
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result!);
                }
            );
            uploadStream.end(response.data);
        });

        imageTracking[email] = {
            url: cloudinaryResponse.secure_url,
            publicId: cloudinaryResponse.public_id,
            uploadedAt: Date.now(),
        };

        setTimeout(async() => {
            if(imageTracking[email] && imageTracking[email].publicId) {
                const timeDiff = Date.now() - imageTracking[email].uploadedAt;
                if(timeDiff > 300000) {
                    try{
                        await cloudinary.v2.uploader.destroy(imageTracking[email].publicId);
                        delete imageTracking[email];
                    }
                    catch(error) {
                        console.error('Error in deleting image:', error);
                    }
                }
            }
        }, 300000);
        console.log(cloudinaryResponse.secure_url)
        return c.body(cloudinaryResponse.secure_url, 200);
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
});


modelRoute.get('/save', async (c) => {
    const email = c.req.query("email"); 

    if(!email || !imageTracking[email]) {
        return c.json({ message: 'No image found' }, 404);
    }

    imageTracking[email].publicId = '';
    imageTracking[email].uploadedAt = 0;

    return c.json({ message: 'image Saved Successfully' }, 200);
})

modelRoute.delete('/cancel', async (c) => {
    const email = c.req.query("email");

    if(!email || !imageTracking[email]) {
        return c.json({ message: 'No image found' }, 404);
    }

    try{
        await cloudinary.v2.uploader.destroy(imageTracking[email].publicId);
        delete imageTracking[email];
        return c.json({ message: 'image Deleted Successfully' }, 200);
    }
    catch(error) {
        return c.json({ message: 'Error in deleting image' }, 500);
    }
})

export default modelRoute;
