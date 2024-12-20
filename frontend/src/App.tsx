import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Navbar } from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Steps from './pages/Steps';
import About from './pages/About';
import Pricing from './pages/Pricing';
import Login from './pages/Login';
import Contact from './pages/Contact';
import Landing from './pages/Landing';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background dark:bg-gray-900 font-sans antialiased text-gray-800 dark:text-gray-200">
        {/* Navbar with DarkModeToggle */}
        <Navbar />
        <main className="container mx-auto mt-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/protect" element={<Steps />} />
            <Route path="/about" element={<About />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
