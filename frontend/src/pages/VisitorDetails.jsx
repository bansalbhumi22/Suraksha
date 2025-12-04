import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBooking } from '../context/BookingContext'
import useTranslation from '../hooks/useTranslation'
import axios from "axios"


const VisitorDetails = () => {
  const navigate = useNavigate()
  const { booking, updateBooking } = useBooking()
  const t = useTranslation()

  const [username, setName] = useState(booking.name || '')
  const [phone, setPhone] = useState(booking.phone || '')
  const [visitors, setVisitors] = useState(booking.total || 1)
  const [elders, setElders] = useState(booking.elders || 0)
  const [differentlyAbled, setDifferentlyAbled] = useState(
    booking.differentlyAbled || 0
  )
  //const [notes, setNotes] = useState(booking.visitors.notes || '') 
  const [errorMsg, setErrorMsg] = useState("");
 const [currentBooking,setCurrentBooking]= useState(null);
    const [previousBookings, setPreviousBookings]=useState([]);
  
  useEffect(() => {
    if (!booking.temple) {
      navigate('/')
    }
  }, [booking.temple, navigate])


   

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg("");


    const visitorsNum = Number(visitors) || 0
    const eldersNum = Number(elders) || 0
    const diffNum = Number(differentlyAbled) || 0
    
     if (!username.trim()) {
      setErrorMsg('Please enter pilgrim name')
      return
    }
    
    if (!Number.isInteger(visitorsNum) || visitorsNum < 1) {
      setErrorMsg('Total visitors must be at least 1')
      return
    }
    if (eldersNum < 0 || diffNum < 0) {
      setErrorMsg('Elders and Differently abled cannot be negative')
      return
    }

    // NEW: enforce sum < 20
    const totalSum = visitorsNum + eldersNum + diffNum
    if (!(totalSum <= 20)) {
      setErrorMsg('Total abled must be less than 20')
      return
    }

    const bookingInfo={
       
        username,
        phone,
        visitors,
        elders,
        differentlyAbled,
      
        id: `BK-${Math.floor(Math.random() * 10000)}`,
        temple: booking.temple.name,
        city: booking.temple.city,
        date: booking.visitDate,
        slot: booking.visitSlot, 
      
    }
    console.log(bookingInfo)
    try {
      const res=await axios.post("http://localhost:8000/api/v1/bookings/booking",bookingInfo,
        {headers :{'content-Type':'application/json'}}
      );

    if (res && (res.status === 200 || res.status === 201)) {
      
      console.log('Booking Successfull:', res.data);
     
    } else {
      console.warn('Booking API responded with unexpected status:', res?.status, res?.data);
    }
    } catch (error) {
      
      console.error('Signup API error:',err);
      setErrorMsg("Something went wrong while Booking! ");
return;
    }
    updateBooking({
      
        name: username,
    phone,
    total: visitors,
    elders,
    differentlyAbled,
        //notes,
      }
    )
    
    //   currentBooking: {
    //     id: `BK-${Math.floor(Math.random() * 10000)}`,
    //     temple: booking.temple.name,
    //     city: booking.temple.city,
    //     date: booking.visitDate,
    //     slot: booking.visitSlot, 
    //     // || booking.parkingTime,
    //     // parking: booking.parkingZone || 'Not selected',
    //     visitors: {
    //       username,
    //       phone,
    //       total,
    //       elders,
    //       differentlyAbled,
    //     },
    //   },
    // })
    

    
    navigate('/confirmation')

  }

  if (!booking.temple) return null

  return (
    <div className="space-y-8">
      <section className="glass-panel space-y-4">
        <p className="text-sm uppercase tracking-wide text-brand-dusk/60">
          {t('details.heading')}
        </p>
        <h2 className="section-heading">{t('details.title')}</h2>
        <p className="text-brand-dusk/70">{t('details.subtitle')}</p>
      </section>

      <form onSubmit={handleSubmit} className="glass-panel space-y-6">
        <div>
          <p className="mb-4 text-sm uppercase tracking-wide text-brand-dusk/60">
            {t('details.dataStep')}
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col text-sm font-medium text-brand-dusk/70">
              Visitors name *
              <input
                type="text"
                value={username}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-2 rounded-2xl border border-brand-dusk/15 bg-white/80 px-4 py-3 focus:border-brand-saffron focus:outline-none"
              />
            </label>

            <label className="flex flex-col text-sm font-medium text-brand-dusk/70">
              Contact number *
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                pattern="[0-9]{10}"
                className="mt-2 rounded-2xl border border-brand-dusk/15 bg-white/80 px-4 py-3 focus:border-brand-saffron focus:outline-none"
              />
            </label>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <label className="flex flex-col text-sm font-medium text-brand-dusk/70">
              visitors *
              <input
                type="number"
                value={visitors}
                onChange={(e) => setVisitors(parseInt(e.target.value) || 1)}
                min="1"
                
                required
                className="mt-2 rounded-2xl border border-brand-dusk/15 bg-white/80 px-4 py-3 focus:border-brand-saffron focus:outline-none"
              />
            </label>

            <label className="flex flex-col text-sm font-medium text-brand-dusk/70">
              Elders (60+)
              <input
                type="number"
                value={elders}
                onChange={(e) => setElders(parseInt(e.target.value) || 0)}
                min="0"
                
                className="mt-2 rounded-2xl border border-brand-dusk/15 bg-white/80 px-4 py-3 focus:border-brand-saffron focus:outline-none"
              />
            </label>

            <label className="flex flex-col text-sm font-medium text-brand-dusk/70">
              Differently abled
              <input
                type="number"
                value={differentlyAbled}
                onChange={(e) => setDifferentlyAbled(parseInt(e.target.value) || 0)}
                min="0"
                
                className="mt-2 rounded-2xl border border-brand-dusk/15 bg-white/80 px-4 py-3 focus:border-brand-saffron focus:outline-none"
              />
            </label>
          </div>

          {/* <label className="mt-4 flex flex-col text-sm font-medium text-brand-dusk/70">
            {t('details.notes')}
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="3"
              placeholder="Any special requirements or medical conditions..."
              className="mt-2 rounded-2xl border border-brand-dusk/15 bg-white/80 px-4 py-3 focus:border-brand-saffron focus:outline-none"
            />
          </label> */}
        </div>

        <div className="rounded-3xl border border-brand-dusk/10 bg-white/80 p-5">
          <p className="text-xs uppercase tracking-wide text-brand-dusk/50">Booking summary</p>
          <div className="mt-3 space-y-1 text-sm text-brand-dusk/70">
            <p>
              <strong>Temple:</strong> {booking.temple.name}
            </p>
            <p>
              <strong>Date:</strong> {booking.visitDate}
            </p>
            {booking.visitSlot && (
              <p>
                <strong>Slot:</strong> {booking.visitSlot}
              </p>
            )}
            {/* {booking.parkingZone && (
              <p>
                <strong>Parking:</strong> {booking.parkingZone} at {booking.parkingTime}
              </p>
            )} */}
            <p>
              <strong>Visitors:</strong> {visitors} 
              {/* (Elders: {elders}, Differently abled:{' '}
              {differentlyAbled}) */}
            </p>
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-brand-dusk px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-brand-saffron"
        >
          {t('details.submit')}
        </button>
        {errorMsg && (
          <p className='text-sm-text-red-500 font-meadium'>{errorMsg}</p>
        )}

      </form>
    </div>
  )
}

export default VisitorDetails



