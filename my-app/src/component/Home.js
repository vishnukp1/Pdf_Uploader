import React, { useEffect, useState } from "react";

import SignUp from "./Signup";
import "../styles/Login.css";
import Login from "./Login";
import { useSelector } from "react-redux";
import "../styles/company.css";
import Footer from "./Footer";
import Navbars from "./Navbars";

function Home() {
  const signup = useSelector((state) => state.login);
  const [token, setToken] = useState(null);
  console.log(signup);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, [token]);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Navbars />

      <div
        className="home-main"
        style={{
          backgroundImage: `url('https://images.contentstack.io/v3/assets/bltefdd0b53724fa2ce/blt6acdcb4a2fdd4a24/5ffdc9f449cfff488f0f6b2b/blog-thumb-generic-pattern-color.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "95vh",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          className="home-text"
          style={{ width: "50rem", marginLeft: "4rem", marginTop: "10rem" }}
        >
          <h2
            className="home-h4-text"
            style={{ color: "white", fontSize: "2.5rem" }}
          >
            Pdf-Harvest Software is the #1 PDF development tool used by people
          </h2>
          <br></br>
          <h4 className="home-h4-text" style={{ color: "white" }}>
            Trusted by 100K+ members, they can upload , exract,download and
            performance the Pdf files.
          </h4>
        </div>

        <div className="home-login" style={{ marginRight: "8rem" }}>
          {signup ? <Login /> : <SignUp />}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
