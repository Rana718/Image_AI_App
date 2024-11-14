import { Hono } from "hono";
import cloudinary from "../../cloudinaryConfig";
import { getImageTracking } from "../context";
import { PrismaClient } from "@prisma/client";

const saveCancelRoute = new Hono();
const prisma = new PrismaClient();


saveCancelRoute.get('/save', async (c) => {
    const email = c.req.query("email");
    const imageTracking = getImageTracking();

    if (!email || !imageTracking[email]) {
        //@ts-expect-error
        console.log(imageTracking[email], email);
        return c.json({ message: 'No image found' }, 404);
    }
    try{
        const imageup = await prisma.userImage.create({
            data: {
                userEmail: email,
                image: imageTracking[email].url,
            }
        });
        delete imageTracking[email];
        return c.json({ message: 'image Saved Successfully' }, 200);
    }catch(error){
        return c.json({ message: 'Error in saving image' }, 500);
    }
})

saveCancelRoute.delete('/cancel', async (c) => {
    const email = c.req.query("email");
    const imageTracking = getImageTracking();
    //@ts-expect-error
    console.log(imageTracking[email], email);
    if (!email || !imageTracking[email]) {
        return c.json({ message: 'No image found' }, 404);
    }

    try {
        await cloudinary.uploader.destroy(imageTracking[email].publicId);
        delete imageTracking[email];
        return c.json({ message: 'image Deleted Successfully' }, 200);
    }
    catch (error) {
        return c.json({ message: 'Error in deleting image' }, 500);
    }
})


export default saveCancelRoute;