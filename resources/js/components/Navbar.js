import React from "react";

function Navbar({ setPage }) {
  const handleClick = (page) => {
    if (typeof setPage === "function") setPage(page);
    // update the URL hash so the address bar reflects the current page
    try {
      // prefer hash navigation (keeps routing simple). Also push history as a fallback.
      window.location.hash = page;
      if (window.history && typeof window.history.pushState === 'function') {
        try {
          window.history.pushState({ page }, '', '#' + page);
        } catch (err) {
          // ignore pushState errors
        }
      }
      // debug log to help local verification
      if (typeof console !== 'undefined' && console.debug) console.debug('navigated to', page);
    } catch (e) {
      // ignore errors on server-side rendering or restricted environments
    }
  };

  return (
    <div className="navbar">
      <div>
        <button type="button" onClick={() => handleClick("home")}>Home</button>
        <button type="button" onClick={() => handleClick("about")}>About Us</button>
        <button type="button" onClick={() => handleClick("contact")}>Contact Us</button>
      </div>
      <div>
        <button type="button" onClick={() => handleClick("login")}>Login</button>
        <button type="button" onClick={() => handleClick("signup")}>Sign Up</button>
      </div>
    </div>
  );
}

export default Navbar;
