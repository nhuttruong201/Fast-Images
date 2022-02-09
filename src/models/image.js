import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const ImageModel = mongoose.model("image", imageSchema);
