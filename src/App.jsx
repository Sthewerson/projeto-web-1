import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Admin from './pages/Admin'
import './App.css'

// Rotas do site:  /  (cardápio)   /admin/login   /admin (painel do dono)
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  )
}

export default App
