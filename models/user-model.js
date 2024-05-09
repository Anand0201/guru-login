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

const database = mongoose.models["techevent-civils"] || mongoose.model("techevent-civils", schema);

export default database