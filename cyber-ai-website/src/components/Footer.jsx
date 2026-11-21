import './Footer.css'

export default function Footer() {
  const scrollTo = (e, id) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <footer className="cmu-footer">
      <div className="cmu-footer-main">
        <div className="container cmu-footer-grid">
          <div>
            <div className="cmu-footer-brand">University Wordmark</div>
            <p className="cmu-footer-address">
              5000 Campus Avenue<br />
              City, State 00000<br />
              +1 (000) 000-0000
            </p>
          </div>

          <div>
            <h4 className="cmu-footer-heading">Explore</h4>
            <ul className="cmu-footer-links">
              <li><a href="#home" onClick={(e) => scrollTo(e, 'home')}>Home</a></li>
              <li><a href="#news" onClick={(e) => scrollTo(e, 'news')}>News &amp; Events</a></li>
              <li><a href="#faculty" onClick={(e) => scrollTo(e, 'faculty')}>Faculty</a></li>
            </ul>
          </div>

          <div>
            <h4 className="cmu-footer-heading">Academics</h4>
            <ul className="cmu-footer-links">
              <li><a href="#academics" onClick={(e) => scrollTo(e, 'academics')}>Undergraduate</a></li>
              <li><a href="#academics" onClick={(e) => scrollTo(e, 'academics')}>Graduate</a></li>
              <li><a href="#academics" onClick={(e) => scrollTo(e, 'academics')}>Doctoral</a></li>
            </ul>
          </div>

          <div>
            <h4 className="cmu-footer-heading">Resources</h4>
            <ul className="cmu-footer-links">
              <li><a href="#feature" onClick={(e) => scrollTo(e, 'feature')}>Campus Spotlight</a></li>
              <li><a href="#home" onClick={(e) => scrollTo(e, 'home')}>Contact Us</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="cmu-footer-bottom">
        <div className="container cmu-footer-bottom-inner">
          <p>© {new Date().getFullYear()} University Template. All rights reserved.</p>
          <div className="cmu-footer-legal">
            <a href="#home" onClick={(e) => e.preventDefault()}>Legal Info</a>
            <a href="#home" onClick={(e) => e.preventDefault()}>Accessibility</a>
            <a href="#home" onClick={(e) => e.preventDefault()}>Privacy Notice</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
