import { Hono } from "hono";

const userRoutes = new Hono();


userRoutes.get("/users", async (c) => {
    const users = [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Doe" },
    ];

    return c.json(users);
})


export default userRoutes;