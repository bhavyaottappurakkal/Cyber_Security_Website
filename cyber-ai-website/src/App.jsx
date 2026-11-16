import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import About from './pages/About'
import Academics from './pages/Academics'
import Research from './pages/Research'
import Projects from './pages/Projects'
import Faculty from './pages/Faculty'
import Placements from './pages/Placements'
import Speakers from './pages/Speakers'
import NewsEvents from './pages/NewsEvents'
import Contact from './pages/Contact'
import './App.css'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/research" element={<Research />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/faculty" element={<Faculty />} />
            <Route path="/placements" element={<Placements />} />
            <Route path="/speakers" element={<Speakers />} />
            <Route path="/news-events" element={<NewsEvents />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
