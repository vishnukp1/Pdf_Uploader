import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { PDFDocument } from "pdf-lib";
import axios from "../Autherization/Autherization";
import "../styles/pdfUploader.css";
import { useNavigate } from "react-router-dom";
import Footer from "../component/Footer";
import Navbars from "../component/Navbars";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const UploadPdf = () => {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [selectedPages, setSelectedPages] = useState([]);
  const [fileName, setFileName] = useState("");
  const [uploadedAt, setUploadedAt] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      alert("Please select a valid PDF file.");
    }
  };

  const handleFileNameChange = (e) => {
    setFileName(e.target.value);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const pageSelection = (pageNumber) => {
    if (selectedPages.includes(pageNumber)) {
      setSelectedPages(selectedPages.filter((page) => page !== pageNumber));
    } else {
      setSelectedPages([...selectedPages, pageNumber]);
    }
  };

  const newlyCreatedPdf = async (e) => {
    e.preventDefault();
    try {
      if (file && selectedPages.length > 0) {
        const reader = new FileReader();
        reader.onload = async function () {
          const pdfBytes = new Uint8Array(reader.result);

          const pdfDoc = await PDFDocument.load(pdfBytes);
          const newPdfDoc = await PDFDocument.create();

          for (const pageNumber of selectedPages) {
            const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [
              pageNumber - 1,
            ]);
            newPdfDoc.addPage(copiedPage);
          }

          const newPdfBytes = await newPdfDoc.save();
          const formData = new FormData();
          formData.append(
            "file",
            new Blob([newPdfBytes], { type: "application/pdf" })
          );
          formData.append("customFileName", fileName);

          const response = await axios.post("/upload-pdf-file", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });

          console.log(response.data);
          if (response.data.status === "success") {
            toast.success("SUCCESSFULLY PDF UPLOADED!");
            setUploadedAt(new Date().toDateString());
          }
        };
        reader.readAsArrayBuffer(file);
      } else {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post("/upload-pdf-file", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (response.data.status === "success") {
          toast.success("SUCCESSFULLY PDF UPLOADED!");
          setUploadedAt(new Date().toDateString());
        }
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div>
      <Navbars />
      <h1
        style={{
          fontSize: "32px",
          fontFamily: "Your Chosen Font",
          margin: "20px 0",
        }}
      >
        How to Extract Pages from a PDF
      </h1>

      <div className="upload-section">
        <h1>Upload Your PDF</h1>
        <input type="file" accept=".pdf" onChange={handleChange} />

        {file && (
          <div className="pdf-preview">
            <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
              {Array.from(new Array(numPages), (el, index) => (
                <div className="pdf-view" key={`page_${index + 1}`}>
                  <label className="page-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedPages.includes(index + 1)}
                      onChange={() => pageSelection(index + 1)}
                    />
                    Page {index + 1}
                  </label>
                  <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </div>
              ))}
            </Document>
          </div>
        )}
        {selectedPages.length > 0 ? (
          <input
            type="text"
            placeholder="Enter custom file name"
            value={fileName}
            onChange={handleFileNameChange}
          />
        ) : null}
        {selectedPages.length > 0 ? (
          <button onClick={newlyCreatedPdf} className="upload-button">
            Extract PDF
          </button>
        ) : (
          <button className="upload-button">Upload</button>
        )}
        {uploadedAt && <p>Uploaded at: {uploadedAt}</p>}
        <button onClick={() => navigate("/view")} className="view-button">
          View PDF Collection
        </button>
        <ToastContainer />
      </div>
      <Footer />
    </div>
  );
};

export default UploadPdf;
