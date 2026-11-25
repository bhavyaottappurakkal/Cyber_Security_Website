import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useContactContent } from '../data/contactData'
import './Footer.css'

export default function Footer() {
  const location = useLocation()
  const navigate = useNavigate()
  const contact = useContactContent()

  const scrollTo = (e, id) => {
    e.preventDefault()
    if (location.pathname !== '/') {
      navigate(id === 'home' ? '/' : `/#${id}`)
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const brandLine = contact.addressLines?.[0] || 'Amrita Center for Cybersecurity Systems & Networks'
  const restAddress = (contact.addressLines || []).slice(1)
  const primaryPhone = contact.phoneNumbers?.[0] || '+91 (0) 476 2804517'
  const primaryEmail = contact.emails?.[0] || 'cyber@am.amrita.edu'

  return (
    <footer className="cmu-footer">
      <div className="cmu-footer-main">
        <div className="container cmu-footer-grid">
          <div>
            <div className="cmu-footer-brand">{brandLine}</div>
            <p className="cmu-footer-address">
              {restAddress.map((line, idx) => (
                <span key={idx}>
                  {line}
                  <br />
                </span>
              ))}
              {primaryPhone} · {primaryEmail}
            </p>
          </div>

          <div>
            <h4 className="cmu-footer-heading">Explore</h4>
            <ul className="cmu-footer-links">
              <li><a href="#home" onClick={(e) => scrollTo(e, 'home')}>Home</a></li>
              <li><a href="#news" onClick={(e) => scrollTo(e, 'news')}>News &amp; Events</a></li>
              <li><a href="#faculty" onClick={(e) => scrollTo(e, 'faculty')}>Our Team</a></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="cmu-footer-heading">Academics</h4>
            <ul className="cmu-footer-links">
              <li><Link to="/academics">Undergraduate</Link></li>
              <li><Link to="/academics/postgraduate">Postgraduate</Link></li>
              <li><Link to="/academics/online-mca">Online MCA</Link></li>
              <li><Link to="/academics/phd">Doctoral</Link></li>
              <li><Link to="/internships">Internships</Link></li>
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
