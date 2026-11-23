import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  const location = useLocation()
  const navigate = useNavigate()

  const scrollTo = (e, id) => {
    e.preventDefault()
    if (location.pathname !== '/') {
      navigate(id === 'home' ? '/' : `/#${id}`)
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <footer className="cmu-footer">
      <div className="cmu-footer-main">
        <div className="container cmu-footer-grid">
          <div>
            <div className="cmu-footer-brand">Amrita Center for Cybersecurity Systems &amp; Networks</div>
            <p className="cmu-footer-address">
              Amrita Vishwa Vidyapeetham, Amritapuri Campus<br />
              Clappanna P.O., Kollam, Kerala – 690525, India<br />
              +91 (0) 476 2804517 · cyber@am.amrita.edu
            </p>
          </div>

          <div>
            <h4 className="cmu-footer-heading">Explore</h4>
            <ul className="cmu-footer-links">
              <li><a href="#home" onClick={(e) => scrollTo(e, 'home')}>Home</a></li>
              <li><a href="#news" onClick={(e) => scrollTo(e, 'news')}>News &amp; Events</a></li>
              <li><a href="#faculty" onClick={(e) => scrollTo(e, 'faculty')}>Our Team</a></li>
            </ul>
          </div>

          <div>
            <h4 className="cmu-footer-heading">Academics</h4>
            <ul className="cmu-footer-links">
              <li><Link to="/academics">Undergraduate</Link></li>
              <li><Link to="/academics/postgraduate">Postgraduate</Link></li>
              <li><Link to="/academics/online-mca">Online MCA</Link></li>
              <li><Link to="/academics/phd">Doctoral</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="cmu-footer-bottom">
        <div className="container cmu-footer-bottom-inner">
          <p>© {new Date().getFullYear()} Amrita Center for Cybersecurity Systems &amp; Networks, Amrita Vishwa Vidyapeetham. All rights reserved.</p>
         
        </div>
      </div>
    </footer>
  )
}
