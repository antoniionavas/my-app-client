import './App.css'
import { Route, Routes } from 'react-router-dom'
//componentes
import Navbar from './components/Navbar'
import IsPrivate from './components/isPrivate'
import BandAddForm from './components/BandAddForm'
import OfferAddForm from './components/OfferAddForm'

//paginas
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
import BandList from './pages/BandList'


function App() {

  return (
    <>
      <Navbar/>

      <Routes>

        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        

        {/* User Routes*/}
        <Route path="/list-users" element={<UserList />} />
        <Route path="/my-profile" element={<IsPrivate><UserDetails /></IsPrivate>} />
        <Route path="/update" element={<IsPrivate><EditUser /></IsPrivate>} />
        <Route path="/user/bandFav" element={<IsPrivate><UserFavBand /></IsPrivate>} />

        {/* Offer Routes*/}
        <Route path="/offers" element={<IsPrivate><OffersList /></IsPrivate>} />
        <Route path="/offer/create" element={<IsPrivate><OfferAddForm /></IsPrivate>}/>
        <Route path="/offer/:id/details" element={<IsPrivate><OfferDetails /></IsPrivate>} />
        <Route path="/offer/:id/edit" element={<IsPrivate><EditOffer /></IsPrivate>} />
        <Route path="/offer/subscribers" element={<IsPrivate><SubsOfferList /></IsPrivate>} />

        {/* Band Routes*/}
        <Route path="/band/:id/details" element={<IsPrivate><BandDetails /></IsPrivate>} />
        <Route path="/band/:id/edit" element={<IsPrivate><EditBand /></IsPrivate>} />
        <Route path="/band/create" element={<IsPrivate><BandAddForm /></IsPrivate>} />
        <Route path="/bands" element={<IsPrivate><BandList /></IsPrivate>} />

        {/* Error Routes*/}
        <Route path="/error" element={<Error/>} />
        <Route path="/*" element={<NotFound/>} />

      </Routes>
    </>
  )
}

export default App
