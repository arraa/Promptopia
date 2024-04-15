import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, "Username is Required"],
            match: [
                /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
                "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
            ],
        },
        email: {
            type: String,
            required: [true, "Email is Required"],
            unique: [true, "Email Already Exists"],
        },
        image: {
            type: String,
        },
    },
    {
        timestamps: [true],
    }
);

const User = models.User || model("User", userSchema);
export default User;
