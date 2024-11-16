import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";

const userImageRoute = new Hono();
const prisma = new PrismaClient();

userImageRoute.get("/", async (c) => {
    const email = c.req.query("email");
    if (!email) {
        return c.json({ error: "Email is required" }, 400);
    }

    try {
        const userImage = await prisma.userImage.findMany({
            where: {
                userEmail: email,
            },
        });
        return c.json(userImage);
    } catch (error) {
        console.log(error);
        return c.json({ error: "Error fetching user images" }, 500);
    }
});

userImageRoute.delete("/", async (c) => {
    const image = c.req.query("image");
    if (!image) {
        return c.json({ error: "Image URL is required" }, 400);
    }

    try {
        const deletedImages = await prisma.userImage.deleteMany({
            where: {
                image: image,
            },
        });

        if (deletedImages.count === 0) {
            return c.json({ error: "No matching image found to delete" }, 404);
        }

        return c.json({ message: "Image deleted successfully", deletedCount: deletedImages.count });
    } catch (error) {
        console.log(error);
        return c.json({ error: "Error deleting user image" }, 500);
    }
});

export default userImageRoute;
