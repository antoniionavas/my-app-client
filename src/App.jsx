import './App.css'
import { Route, Routes } from 'react-router-dom'
//componentes
import Navbar from './components/Navbar'
import IsPrivate from './components/isPrivate'

//paginas
import PrivateExample from './pages/PrivateExample.jsx'
import Error from './pages/Error.jsx'
import NotFound from './pages/NotFound.jsx'
import Home from './pages/Home.jsx'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import EditUser from './pages/EditUser.jsx'
import UserList from './pages/UserList.jsx'
import UserFavBand from './pages/UserFavBand.jsx'
import UserDetails from './pages/UserDetails.jsx'
import OffersList from './pages/OffersList.jsx'
import OfferDetails from './pages/OfferDetails.jsx'
import EditOffer from './pages/EditOffer.jsx'
import SubsOfferList from './pages/SubsOfferList.jsx'
import EditBand from './pages/EditBand.jsx'
import BandDetails from './pages/BandDetails.jsx'



function App() {

  return (
    <>
      <Navbar/>

      <Routes>

        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/private" element={<IsPrivate><PrivateExample /></IsPrivate>} />

        {/* User Routes*/}
        <Route path="/list-users" element={<UserList />} />
        <Route path="/my-profile" element={<IsPrivate><UserDetails /></IsPrivate>} />
        <Route path="/update" element={<IsPrivate><EditUser /></IsPrivate>} />
        <Route path="/user/bandFav" element={<IsPrivate><UserFavBand /></IsPrivate>} />

        {/* Offer Routes*/}
        <Route path="/offer" element={<OffersList />} />
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
