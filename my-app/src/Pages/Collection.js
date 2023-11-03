import React, { useEffect, useState } from "react";
import axios from "../Autherization/Autherization";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import Image from "../image/pdfimage2.png";
import Footer from "../component/Footer";
import Navbars from "../component/Navbars";

const Collection = () => {
  const [pdf, setPdf] = useState([]);
  const navigate = useNavigate();

  const buttonStyle = {
    fontSize: "12px",
    padding: "6px 14px",
    marginLeft: "4px",
    border: "0px solid #343a40",
    backgroundColor: "#fa7885",
    color: "black",
  };

  useEffect(() => {
    const getPdfFile = async () => {
      const response = await axios.get("http://localhost:5555/get-pdf-files");
      const data = response.data.data;
      console.log("getting", data);
      setPdf(data);
    };
    getPdfFile();
  }, []);

  const showPdf = (pdf) => {
    window.open(`http://localhost:5555/uploads/${pdf}`, "_blank", "noreferrer");
  };

  const deletePdf = async (id) => {
    try {
      await axios.delete(`http://localhost:5555/delete-pdf-file/${id}`);
      setPdf(pdf.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting PDF:", error);
    }
  };

  const deleteAllPdf = async () => {
    try {
      await axios.delete("http://localhost:5555/delete-all-pdf-files");
      setPdf([]);
    } catch (error) {
      console.error("Error deleting all PDFs:", error);
    }
  };

  return (
    <div>
      <Navbars />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2
          style={{
            textAlign: "left",
            marginTop: "1.3rem",
            marginBottom: "1.2rem",
            fontFamily: "Arial, sans-serif",
            fontSize: "2.7rem",
            paddingLeft: "15px",
          }}
        >
          ALL PDF FILES
        </h2>
        <Button
          className="delele-pdf-all"
          style={{
            height: "35px",
            marginTop: "17px",
            marginRight: "12px",
            background: "#8d8e8f",
            fontSize: "12px",
          }}
          onClick={deleteAllPdf}
        >
          Delete All PDFs
        </Button>
      </div>
      <div
        style={{
          flex: 1,
          height: "2.9px",
          backgroundColor: "#1B1E36",
          marginBottom: "21px",
          marginTop: "-14px",
        }}
      />
      <Row
        className="custom-row"
        style={{ padding: "15px" }}
        xs={1}
        md={2}
        lg={3}
        xl={6}
      >
        {(() => {
          const length = pdf.length;
          const reversedPdf = [];
          for (let i = length - 1; i >= 0; i--) {
            const item = pdf[i];
            const uploadedAtDate = new Date(item.uploadedAt);
            const formattedDate = `${uploadedAtDate.getDate()}/${
              uploadedAtDate.getMonth() + 1
            }/${uploadedAtDate.getFullYear()}`;

            reversedPdf.push(
              <Col key={item._id} className="custom-col">
                <Card
                  style={{
                    maxWidth: "18rem",
                    maxHeight: "21rem",
                    boxShadow: "12px 12px 12px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <Card.Img
                    component="img"
                    alt="pdf image"
                    height="200"
                    src={Image}
                  />
                  <Card.Body style={{ marginTop: "-25px" }}>
                    <Card.Title>
                      {item.customFileName
                        ? item.customFileName
                        : item.document}
                    </Card.Title>
                    <Card.Title>{formattedDate}</Card.Title>
                    <Button
                      style={buttonStyle}
                      onClick={() => showPdf(item.document)}
                    >
                      Show pdf
                    </Button>
                    <Button
                      style={buttonStyle}
                      onClick={() => deletePdf(item._id)}
                    >
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          }
          return reversedPdf;
        })()}
      </Row>

      <Footer />
    </div>
  );
};

export default Collection;
