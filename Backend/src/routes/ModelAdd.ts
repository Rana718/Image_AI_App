import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";

const modelAddRoute = new Hono();
const prisma = new PrismaClient();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


modelAddRoute.post("/aimodel", async (c) => {
    const { name, aiModelName, defaultPrompt, isFeatured, userImageUpload, style, avater, icon, banner } = await c.req.json();

    console.log(name, aiModelName, defaultPrompt, isFeatured, userImageUpload, style, avater, icon, banner);

    try{
        const iconUploadRes = icon ? await cloudinary.uploader.upload(icon, { folder: "icon" }) : null;
        const bannerUploadRes = banner ? await cloudinary.uploader.upload(banner, { folder: "banner" }) : null;

        const newModel = await prisma.aiModelList.create({
            data:{
                name,
                aiModelName,
                defaultPrompt: defaultPrompt || null,
                isFeatured,
                userImageUpload,
                style,
                avater,
                icon: iconUploadRes ? iconUploadRes.secure_url : null,
                banner: bannerUploadRes ? bannerUploadRes.secure_url : null,
            },
        });
        return c.json({ message: "Model added successfully", model: newModel}, 201);
    }catch(err){
        console.log(err);
        return c.json({ message: "Error adding model" }, 500)
    }

})

modelAddRoute.get("/aimodel", async (c) => {
    const model = c.req.query("model") === 'true';
    if (model === undefined) {
        return c.json({ error: "Model is required" }, 400);
    }

    try {
        const modelList = await prisma.aiModelList.findMany({
            where: {
                isFeatured: model,
            },
        });

        if (modelList.length === 0) {
            return c.json({ message: "No user found with this model" }, 404);
        }
        return c.json(modelList);
    } catch (e) {
        console.error("Error fetching user data:", e);
        return c.json({ error: "Internal server error" }, 500);
    }
})


export default modelAddRoute;