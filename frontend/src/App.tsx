import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background font-sans antialiased">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Add more routes here as you create more pages */}
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App