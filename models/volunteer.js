import mongoose from "mongoose";

const schema = mongoose.Schema({
    department: { type: String },
    technicalevent: { type: String },
    name: { type: String, lowercase: true },
    email: { type: String, lowercase: true },
    phone: { type: Number },
    collagename: { type: String },
    categories: { type: String },
    winner: { type: String },
});

const volunteer = mongoose.models["techevent-volunteer"] || mongoose.model("techevent-volunteer", schema);

export default volunteer