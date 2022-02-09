import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            default: "",
        },
        isShared: {
            type: Boolean,
            default: false,
        },
        isReadonly: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

export const CollectionModel = mongoose.model("collection", collectionSchema);
