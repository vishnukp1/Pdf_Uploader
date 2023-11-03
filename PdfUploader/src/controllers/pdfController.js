const Pdf = require("../models/pdfModel"); 

const uploadPdfFile = async (req, res) => {
    try {
        const uploadedFile = req.file;
        if (!uploadedFile) {
            return res.status(400).json({
                status: "error",
                message: "No PDF file provided for upload.",
            });
        }

        const userId = req.user._id; // Assuming you have user information in the request after authentication

        const customFileName = req.body.customFileName || uploadedFile.originalname;
        const uploadedAt = req.body.uploadedAt; // Get the uploadedAt date from the request

        const pdfFile = await Pdf.create({
            document: uploadedFile.filename,
            user: userId,
            customFileName: customFileName,
            uploadedAt: uploadedAt, // Include the uploadedAt date
        });

        res.json({
            status: "success",
            message: "PDF file uploaded successfully",
            data: pdfFile,
        });
    } catch (error) {
        console.error("Error uploading PDF:", error);
        res.status(500).json({
            status: "error",
            message: "An error occurred while uploading the PDF file.",
        });
    }
};

const getPdfFile = async (req, res) => {
    const userId = req.user._id;
    const pdfFiles = await Pdf.find({ user: userId });
    res.json({
        status: "success",
        message: "PDF files retrieved successfully",
        data: pdfFiles
    });
}



const getPdfById = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const pdfFile = await Pdf.findById({ _id: id });
    res.json({
        status: "success",
        message: "Pdf file got successfully",
        data: pdfFile
    });
}

const deleteAllPdfFiles = async (req, res) => {
    try {
        await Pdf.deleteMany({}); 
        res.json({
            status: "success",
            message: "All PDF files have been deleted successfully",
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Error deleting PDF files",
        });
    }
};

const deletePdfById = async (req, res) => {
    const id = req.params.id;
    try {
        const pdfFile = await Pdf.findByIdAndDelete(id);
        if (!pdfFile) {
            return res.status(404).json({
                status: "error",
                message: "PDF file not found",
            });
        }
        res.json({
            status: "success",
            message: "PDF file has been deleted successfully",
            data: pdfFile,
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Error deleting the PDF file",
        });
    }
};


module.exports = { 
    uploadPdfFile, 
    getPdfFile, 
    getPdfById, 
    deleteAllPdfFiles, // Add this
    deletePdfById // Add this
};

