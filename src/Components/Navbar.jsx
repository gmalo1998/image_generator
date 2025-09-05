import React, { useState } from "react";
import { ChevronDown, Download, ImageDown, ImageDownIcon, LayoutGrid } from "lucide-react";
import "../Components/Navbar.css";

const Navbar = ({ setFormat, setOpen, open, format, handleDownload,setOpenPopup}) => {
 

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <div className="navbar-logo-circle">
          <span className="navbar-logo-text">WC</span>
        </div>
        <h1 className="navbar-title">WordCanvas</h1>
      </div>

      {/* Dropdown + Download */}
      <div className="navbar-actions">
        <div className="templatebutton">
  <button onClick={()=>setOpenPopup(true)} className="choose-template-btn"><LayoutGrid className="grid" /><p>Choose Template</p></button>
</div>
        {/* Dropdown */}
        <div className="dropdown">
          <button
            className="dropdown-btn"
            onClick={() => {setOpen(!open);}}
          >
            {format}
            <ChevronDown className="icon" />
          </button>
          {open && (
            <div className="dropdown-menu">
              <ul>
                {['toPNG', 'toJPEG', 'toSVG'].map((opt) => (
                  <li key={opt}>
                    <button
                      className="dropdown-item"
                      onClick={() => {setFormat(opt); setOpen(false)}}
                    >
                      {opt}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Download Button */}
        <button
          onClick={handleDownload}
          disabled={format === "Select Format"}
          className="download-btn-one"
        >
         <Download className='download-icon1'/> <p className="download-text">Download</p> 
        </button>
      </div>
    </nav>
  );
}


export default Navbar
