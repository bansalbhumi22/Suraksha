/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

const BookingContext = createContext(null)

const buildInitialBooking = () => ({
  temple: null,
  searchQuery: '',
  visitDate: '',
  visitSlot: '',
  vehicleType: 'Car',
  parkingZone: '',
  parkingTime: '',
  parkingSlot: '',
  visitors: {
    name: '',
    phone: '',
    email: '',
    total: 1,
    elders: 0,
    differentlyAbled: 0,
    notes: '',
  },
  isReturningVisitor: false,
  otpVerified: false,
  isAuthenticated: false,
  pendingPath: '',
  currentBooking: {
    id: 'CB-20341',
    temple: 'Tirumala Tirupati Devasthanams',
    city: 'Tirupati, Andhra Pradesh',
    date: '04 Mar 2025',
    slot: '06:00 – 07:00 AM',
    parking: 'North Gate Multi-level',
    visitors: {
      name: 'Aarav Mehta',
      phone: '9876543210',
      total: 4,
      elders: 1,
      differentlyAbled: 1,
    },
  },
  pastBookings: [
    {
      id: 'BK-1221',
      temple: 'Shri Jagannath Puri',
      city: 'Puri, Odisha',
      date: '12 Jan 2025',
      slot: '07:00 – 08:00 AM',
      parking: 'Riverfront Shuttle Bay',
      status: 'Completed',
      visitors: {
        name: 'Aarav Mehta',
        phone: '9876543210',
        total: 3,
        elders: 1,
        differentlyAbled: 0,
      },
    },
    {
      id: 'BK-1189',
      temple: 'Shri Kashi Vishwanath Temple',
      city: 'Varanasi, Uttar Pradesh',
      date: '24 Nov 2024',
      slot: '05:00 – 06:00 AM',
      parking: 'South Mandap VIP Zone',
      status: 'Completed',
      visitors: {
        name: 'Aarav Mehta',
        phone: '9876543210',
        total: 5,
        elders: 2,
        differentlyAbled: 1,
      },
    },
  ],
})

export const BookingProvider = ({ children }) => {
  const [booking, setBooking] = useState(buildInitialBooking)
  const [language, setLanguage] = useState('en')

  const updateBooking = useCallback((partial) => {
    setBooking((prev) => ({
      ...prev,
      ...partial,
      visitors: {
        ...prev.visitors,
        ...(partial.visitors ?? {}),
      },
    }))
  }, [])

  const resetBooking = useCallback(() => setBooking(buildInitialBooking()), [])

  const value = useMemo(
    () => ({
      booking,
      updateBooking,
      resetBooking,
      language,
      setLanguage,
    }),
    [booking, updateBooking, resetBooking, language],
  )

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  )
}

export const useBooking = () => {
  const ctx = useContext(BookingContext)
  if (!ctx) {
    throw new Error('useBooking must be used inside BookingProvider')
  }
  return ctx
}

