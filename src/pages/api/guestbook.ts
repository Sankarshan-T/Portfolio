export const prerender = false;

import type { APIRoute } from "astro";
import { db } from "../../db";
import { guestBook } from "../../db/schema";

export const POST: APIRoute = async ({ request }) => {
    try {
        const { name, message } = await request.json();

        const cleanName = name?.trim();
        const cleanMessage = message?.trim();

        if (!cleanName || !cleanMessage) {
            return new Response("Please fill in all fields.", {
                status: 400,
            });
        }

        if (cleanName.length > 50) {
            return new Response("Name too long", { status: 400 });
        }

        if (cleanMessage.length > 500) {
            return new Response("Message too long", { status: 400 });
        }

        await db.insert(guestBook).values({
            name: cleanName,
            message: cleanMessage,
        });

        return Response.json({
            success: true,
        });
    } catch (error) {
        console.error(error);

        return new Response("Something went wrong.", {
            status: 500,
        });
    }
};