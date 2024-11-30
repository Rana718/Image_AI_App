import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";

const userRoutes = new Hono();
const prisma = new PrismaClient();


userRoutes.get("/", async (c) => {
    return c.json("Hello World");
})

userRoutes.get("/user", async (c) => {
    const email = c.req.query("email");
    if (!email) {
        return c.json({ error: "Email is required" }, 400);
    }

    try {
        const user = await prisma.userList.findMany({
            where: {
                userEmail: email,
            },
        });

        if (user.length === 0) {
            return c.json({ message: "No user found with this email" }, 404);
        }
        return c.json(user);
    } catch (e) {
        console.error("Error fetching user data:", e);
        return c.json({ error: "Internal server error" }, 500);
    }
})

userRoutes.post("/user", async (c) => {
    const { name, email } = await c.req.json();

    if (!name || !email) {
        return c.json({ error: "Name and email are required" }, 400);
    }

    try {
        const user = await prisma.userList.create({
            data: {
                userName: name,
                userEmail: email,
                credits: 100
            },
        });

        return c.json({ message: "User created successfully", user: user }, 201);
    } catch (error) {
        console.error("Error creating user:", error);
        return c.json({ error: "Internal server error" }, 500);
    }
})


export default userRoutes;