import './App.css'
import { Route, Routes } from 'react-router-dom'
//componentes
import Navbar from './components/Navbar'
import IsPrivate from './components/isPrivate'

//paginas
import PrivateExample from './pages/PrivateExample'
import Error from './pages/Error'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import EditUser from './pages/EditUser'
import UserList from './pages/UserList'
import UserFavBand from './pages/UserFavBand'
import UserDetails from './pages/UserDetails'
import OfferList from './pages/OfferList'
import OfferDetails from './pages/OfferDetails'
import EditOffer from './pages/EditOffer'
import SubsOfferList from './pages/SubsOfferList'
import EditBand from './pages/EditBand'
import BandDetails from './pages/BandDetails'



function App() {

  return (
    <>
      <Navbar/>

      <Routes>

        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/private" element={<IsPrivate> <PrivateExample /> </IsPrivate>} />

        {/* User Routes*/}
        <Route path="/user" element={<UserList />} />
        <Route path="/user/:id/details" element={<UserDetails />} />
        <Route path="/user/:id/edit" element={<EditUser />} />
        <Route path="/user/bandFav" element={<UserFavBand />} />

        {/* Offer Routes*/}
        <Route path="/offer" element={<OfferList />} />
        <Route path="/offer/:id/details" element={<OfferDetails />} />
        <Route path="/offer/:id/edit" element={<EditOffer />} />
        <Route path="/offer/subscribers" element={<SubsOfferList />} />

        {/* Band Routes*/}
        <Route path="/band/:id/details" element={<BandDetails />} />
        <Route path="/band/:id/edit" element={<EditBand />} />


        {/* Error Routes*/}
        <Route path="/error" element={<Error/>} />
        <Route path="/*" element={<NotFound/>} />

      </Routes>
    </>
  )
}

export default App
