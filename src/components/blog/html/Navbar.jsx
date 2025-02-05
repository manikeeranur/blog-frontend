import React from "react";
// import Profile from "../images/profile/profile.png";
import { Link } from "react-scroll";
import Sidebar from "./Sidebar";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-xl navbar-light bg-white text-dark sticky-top">
        <Sidebar />
        <div className="container">
          <a className="navbar-brand" href="#">
            {/* <img src={Profile} alt="" width={40} className="rounded-circle" /> */}
            <small className="ms-2">Student Coder </small>
          </a>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav me-auto ms-md-auto me-md-0 mt-2 mt-lg-0">
              <li className="nav-item">
                <Link
                  to="home"
                  smooth={true}
                  duration={400}
                  offset={-80}
                  className="nav-link"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="education"
                  smooth={true}
                  duration={400}
                  offset={-80}
                  className="nav-link"
                >
                  Education
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="experience"
                  smooth={true}
                  duration={400}
                  offset={-50}
                  className="nav-link"
                >
                  Experience
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="skills"
                  smooth={true}
                  duration={400}
                  offset={-50}
                  className="nav-link"
                >
                  Techs Used
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="contact"
                  smooth={true}
                  duration={400}
                  offset={-80}
                  className="nav-link"
                >
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="youtube"
                  smooth={true}
                  duration={400}
                  offset={-80}
                  className="nav-link"
                >
                  Youtube Channel
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
