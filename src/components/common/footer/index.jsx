import React from "react";
import "./style.css";
import EmailIcon from "@mui/icons-material/Email";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

function Footer() {
  return (
    <footer className="footer">
      <div className="social-links">
        <a 
          href="mailto:gambler.gabarr@gmail.com" 
          aria-label="Email"
        >
          <EmailIcon className="social-link" />
        </a>
        <a 
          href="https://x.com/GamblerGabbar" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Twitter"
        >
          <TwitterIcon className="social-link" />
        </a>
        <a 
          href="https://www.instagram.com" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <InstagramIcon className="social-link" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;