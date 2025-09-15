import mongoose from "mongoose";

const User = mongoose.createSchema(
    {
        username: {String},
        password: {String}
    }
)