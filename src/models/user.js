import { Schema, model } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 60,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 70,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    }
}, {
    timestamps: true,
    toJSON: {
        transform(_, returningDoc){
            returningDoc.id = returningDoc._id;
            delete returningDoc._id
        }
    }
});

export const User = model("user", userSchema);
