import React from 'react'
import "../Components/Footer.css"
const Footer = () => {
  return (
    <footer className="footer">
  <div className="footer-content">
     <p>© 2025 Ganesh Malo made with 💛 | All Rights Reserved</p>
    <div className="social-icons">
      <a href="https://github.com/gmalo1998" target="_blank" rel="noopener noreferrer">
        <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" />
      </a>
      <a href="https://www.linkedin.com/in/ganesh-malo-859a55211/" target="_blank" rel="noopener noreferrer">
        <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" />
      </a>
      <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer">
        <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" />
      </a>
    </div>
  </div>
</footer>

  )
}

export default Footer
