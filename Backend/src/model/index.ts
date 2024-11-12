import { Hono } from "hono";
import { config } from "dotenv";

config();

const modelRoute = new Hono();
const model = process.env.MODEL_ID;
const apiKey = process.env.HUGGING_FACE_API_KEY;

modelRoute.post("/texttoimage", async (c) => {
    const { text } = await c.req.json();

    if (!text) {
        return c.json({ error: "Missing text or email" }, 400);
    }

    try {
        const url = `https://api-inference.huggingface.co/models/${model}`;
        const res = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ inputs: text }),
        });

        const contentType = res.headers.get("content-type") || "application/octet-stream";

        if (res.ok && contentType.startsWith("image/")) {
            const arrayBuffer = await res.arrayBuffer();
            return c.body(arrayBuffer, 200, {
                "Content-Type": contentType,
                "Content-Disposition": `attachment; filename="generated_image.png"`,
            });
        }

        const errorResponse = await res.json();
        return c.json({ error: "Non-image response from API", details: errorResponse }, 500);

    } catch (error) {
        return c.json({ error: "Error processing image" }, 500);
    }
});

export default modelRoute;
