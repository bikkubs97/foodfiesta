import mongoose from "mongoose"

import { Schema } from "mongoose";



const userSchema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    data: { type: Array, default: [] }
  });



export default mongoose.model('User', userSchema);
