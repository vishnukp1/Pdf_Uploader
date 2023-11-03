const express = require("express");
const pdf = require("../controllers/pdfController");
const tryCatch = require("../middlewires/trycatch");
const upload = require("../middlewires/multer");
const userVerify = require("../middlewires/userVerify");

const router = express.Router();

router.post("/upload-pdf-file", upload.single("file"), userVerify,tryCatch(pdf.uploadPdfFile));
router.get("/get-pdf-files", userVerify,tryCatch(pdf.getPdfFile));
router.get("/get-pdf-file/:id", userVerify,tryCatch(pdf.getPdfById));
router.delete("/delete-all-pdf-files", userVerify,tryCatch(pdf.deleteAllPdfFiles));
router.delete("/delete-pdf-file/:id", userVerify,tryCatch(pdf.deletePdfById));

module.exports = router;
