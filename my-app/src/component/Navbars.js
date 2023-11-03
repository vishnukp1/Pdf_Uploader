import { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken } from "../Reducers/UserReducer";
import logo from "../assets/pdfharvest-high-resolution-logo-black-removebg-preview.png";
import "../styles/company.css";

function Navbars() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutClick, setLogoutClick] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    dispatch(setToken(storedToken));
    if (logoutClick) {
      window.location.reload();
    }
  }, [dispatch, logoutClick]);

  const logout = async () => {
    localStorage.removeItem("userid");
    localStorage.removeItem("token");
    navigate("/frontpage");
  };
  const userId = localStorage.getItem("token");

  return (
    <Navbar
      className="navbar-navbr"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <div>
        <img
          className="navbar-img"
          style={{
            width: "6rem",
            height: "3.5rem",
            marginLeft: "1rem",
            marginTop: "-.2rem",
          }}
          src={logo}
          alt=""
          onClick={() => navigate("/")}
        ></img>
      </div>
      <div>
        {userId ? (
          <button
            style={{ marginRight: "2rem" }}
            className="logout-btn"
            onClick={() => logout()}
          >
            logout
          </button>
        ) : (
          <button
            style={{ marginRight: "2rem" }}
            className="logout-btn"
            onClick={() => logout()}
          >
            SingIn
          </button>
        )}
      </div>
    </Navbar>
  );
}

export default Navbars;
