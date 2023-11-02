import React from "react";
import "halfmoon/css/halfmoon.min.css";
const NavBar = () => {
  return (
    <>
      <nav
        className="navbar navbar-expand-md"
        style={{
          backgroundColor: "var(--bs-content-bg)",
          borderBottom:
            "var(--bs-border-width) solid var(--bs-content-border-color)",
        }}
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar-collapse-2"
            aria-controls="navbar-collapse-2"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbar-collapse-2">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/edit">
                  Cabs
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/history">
                  Bookings
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
