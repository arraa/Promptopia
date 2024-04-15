import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";

export const GET = async (req, { params: { id } }) => {
    try {
        await connectToDB();
        const prompts = await Prompt.findById(id).populate("creator");

        if (!prompts) {
            return new Response("Prompt not found", { status: 404 });
        }

        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 });
    }
};

export const PATCH = async (req, { params: { id } }) => {
    const { prompt, tag } = await req.json();

    try {
        await connectToDB();
        const existingPrompt = await Prompt.findById(id);

        if (!existingPrompt) {
            return new Response("Prompt not found", { status: 404 });
        }

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), { status: 200 });
    } catch (error) {
        return new Response("Failed to update the prompt", { status: 500 });
    }
};

export const DELETE = async (req, { params: { id } }) => {
    try {
        await connectToDB();
        await Prompt.findByIdAndRemove(id);
        return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
        return new Response("Failed to delete the prompt", { status: 500 });
    }
};
