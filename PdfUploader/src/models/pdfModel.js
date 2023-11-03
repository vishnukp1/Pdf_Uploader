const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema({
    document: {
        type: String, 
        required: true,
    },
    customFileName: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true,
    },
    uploadedAt: {
        type: Date, 
        default: Date.now,
    },
});

const Pdf = mongoose.model("Pdf", pdfSchema);

module.exports = Pdf;
