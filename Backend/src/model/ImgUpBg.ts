import { Hono } from 'hono';
import { config } from 'dotenv';
import FormData from 'form-data';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import cloudinary from '../../cloudinaryConfig';
import { addImageToTracking } from '../context';

config();
const imageUpBgRoute = new Hono();
const rapid = process.env.RAPID_API_KEY;


imageUpBgRoute.post('/imgupbg', async (c) => {
    const { imageBase64, isremovebg, email } = await c.req.json();

    const app_url = isremovebg === 'true' ? 'https://ai-background-remover.p.rapidapi.com/image/matte/v1' : 'https://ai-image-upscaler1.p.rapidapi.com/v1';

    const rapiapi_host = isremovebg === 'true' ? 'ai-background-remover.p.rapidapi.com' : 'ai-image-upscaler1.p.rapidapi.com';
    const buffer = Buffer.from(imageBase64, 'base64');
    const tempDir = path.join('uploads');

    console.log('Email:', isremovebg, 'app_url:', app_url);

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
        
        let imageData;
        if (isremovebg === 'true') {
            imageData = response.data;
        }else{
            const responseJson = JSON.parse(response.data.toString());
            imageData = Buffer.from(responseJson.result_base64, 'base64');
        }

        const cloudinaryResponse = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { resource_type: 'image' },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result!);
                }
            );
            uploadStream.end(imageData);
        });

        console.log('Cloudinary response:', cloudinaryResponse);


        
        addImageToTracking({
            email,
            //@ts-expect-error
            publicId: cloudinaryResponse.public_id,
            //@ts-expect-error
            url: cloudinaryResponse.secure_url,
        });
        
        //@ts-expect-error
        console.log(cloudinaryResponse.secure_url)
        //@ts-expect-error
        return c.body(cloudinaryResponse.secure_url, 200);
    } catch (error) {
        console.error('Error:', error);
        return c.json({ error: 'Failed to process image' }, 500);
    } finally {
        fs.unlinkSync(tempFilePath);
    }
});

export default imageUpBgRoute;