import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { BookingProvider } from './context/BookingContext'
import AppLayout from './components/AppLayout'
import TempleSearch from './pages/TempleSearch'
import BookingOptions from './pages/BookingOptions'
import SlotAvailability from './pages/SlotAvailability'
import ParkingAvailability from './pages/ParkingAvailability'
import ParkingSlotSelection from './pages/ParkingSlotSelection'
import VisitorDetails from './pages/VisitorDetails'
import UserAccess from './pages/UserAccess'
import Confirmation from './pages/Confirmation'
import TempleMap from './pages/TempleMap'






function App() {
  return (
    <BookingProvider>
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<TempleSearch />} />
            <Route path="/booking" element={<BookingOptions />} />
            <Route path="/slots" element={<SlotAvailability />} />
            <Route path="/parking" element={<ParkingAvailability />} />
            <Route path="/parking-slots" element={<ParkingSlotSelection />} />
            <Route path="/details" element={<VisitorDetails />} />
            <Route path="/access" element={<UserAccess />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/temple-map" element={<TempleMap />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </BookingProvider>
  )
}

export default App
