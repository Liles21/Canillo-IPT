import React, { useState } from "react";
import ReactDOM from "react-dom";
import Navbar from "./navbar";
import Home from "./Home";
import About from "./About.us";
import Contact from "./Contact";
import Login from "./Login";
import Signup from "./Signup";

function Router() {
  const [page, setPage] = useState("login");

  return (
    <>
      <Navbar setPage={setPage} />
      {page === "home" && <Home />}
      {page === "about" && <About />}
      {page === "contact" && <Contact />}
      {page === "login" && <Login />}
      {page === "signup" && <Signup />}
    </>
  );
}

export default Router;

ReactDOM.render(<Router />, document.getElementById("app"));
