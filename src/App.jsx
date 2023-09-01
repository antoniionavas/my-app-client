import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import PrivateExample from './pages/PrivateExample'
import Error from './pages/Error'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import IsPrivate from './components/IsPrivate'

function App() {

  return (
    <>
      <Navbar/>

      <Routes>

        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/private" element={<IsPrivate> <PrivateExample /> </IsPrivate>} />
        <Route path="/error" element={<Error/>} />
        <Route path="/*" element={<NotFound/>} />

      </Routes>
    </>
  )
}

export default App
