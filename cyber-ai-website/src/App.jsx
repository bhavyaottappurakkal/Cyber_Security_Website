import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import OnePage from './pages/OnePage'
import About from './pages/About'
import Academics from './pages/Academics'
import Research from './pages/Research'
import Projects from './pages/Projects'
import Faculty from './pages/Faculty'
import Placements from './pages/Placements'
import Speakers from './pages/Speakers'
import NewsEvents from './pages/NewsEvents'
import Contact from './pages/Contact'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import PostGraduate from './pages/PostGraduate'
import PhD from './pages/PhD'
import OnlineMCA from './pages/OnlineMCA'
import Internships from './pages/Internships'
import ProgramDetail from './pages/ProgramDetail'
import './App.css'

// Routes where Navbar and Footer should be hidden
const HIDDEN_CHROME_ROUTES = ['/cyber-panel', '/admin/dashboard']

function AppLayout() {
  const location = useLocation()
  const hideChrome = HIDDEN_CHROME_ROUTES.includes(location.pathname)

  return (
    <div className={hideChrome ? '' : 'app'}>
      {!hideChrome && <Navbar />}
      <main className={hideChrome ? '' : 'main-content'}>
        <div key={location.pathname} className={hideChrome ? '' : 'page-enter'}>
          <Routes>
            <Route path="/" element={<OnePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/academics/postgraduate" element={<PostGraduate />} />
            <Route path="/academics/phd" element={<PhD />} />
            <Route path="/academics/online-mca" element={<OnlineMCA />} />
            <Route path="/internships" element={<Internships />} />
            <Route path="/academics/program/:id" element={<ProgramDetail />} />
            <Route path="/research" element={<Research />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/faculty" element={<Faculty />} />
            <Route path="/placements" element={<Placements />} />
            <Route path="/speakers" element={<Speakers />} />
            <Route path="/news-events" element={<NewsEvents />} />
            <Route path="/contact" element={<Contact />} />
            {/* Admin login — hidden from public nav */}
            <Route path="/cyber-panel" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </div>
      </main>
      {!hideChrome && <Footer />}
    </div>
  )
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppLayout />
    </Router>
  )
}

export default App
