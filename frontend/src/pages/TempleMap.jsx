import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBooking } from '../context/BookingContext'

const TempleMap = () => {
  const navigate = useNavigate()
  const { booking } = useBooking()

  useEffect(() => {
    if (!booking.temple) {
      navigate('/')
    }
  }, [booking.temple, navigate])

  if (!booking.temple) {
    return null
  }

  // Different map layouts for different temples
  const getTempleMap = () => {
    switch (booking.temple.id) {
      case 'kv':
        return <KashiVishwanathMap />
      case 'tirupati':
        return <TirupatiMap />
      case 'madurai':
        return <MaduraiMap />
      case 'puri':
        return <PuriMap />
      default:
        return <DefaultTempleMap />
    }
  }

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border-2 border-gray-200 bg-white p-8 shadow-lg">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-orange bg-brand-orange/5 px-3 py-1">
          <span className="text-sm">🗺️</span>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-orange">
            Temple Interior Map
          </p>
        </div>
        <h2 className="mt-3 font-display text-2xl font-bold text-black md:text-3xl">
          {booking.temple.name}
        </h2>
        <p className="mt-2 text-gray-600">Navigate through the temple premises</p>
      </section>

      <div className="rounded-3xl border-2 border-gray-200 bg-white p-8 shadow-lg">
        {getTempleMap()}
      </div>

      <div className="rounded-3xl border-2 border-gray-200 bg-white p-6 shadow-lg">
        <h3 className="mb-4 font-bold text-black">Legend</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-brand-orange"></div>
            <span className="text-sm text-gray-700">Main Sanctum</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-blue-500"></div>
            <span className="text-sm text-gray-700">Entry/Exit Points</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-green-500"></div>
            <span className="text-sm text-gray-700">Queue Zones</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-gray-400"></div>
            <span className="text-sm text-gray-700">Emergency Exits</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Default temple map component
const DefaultTempleMap = () => (
  <div className="flex min-h-[500px] items-center justify-center">
    <svg className="h-full w-full max-w-4xl" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Main Temple Structure */}
      <rect x="250" y="150" width="300" height="300" stroke="#d84315" strokeWidth="3" fill="#fff" />
      
      {/* Sanctum */}
      <rect x="325" y="225" width="150" height="150" fill="#d84315" opacity="0.2" />
      <text x="400" y="310" textAnchor="middle" className="text-sm font-bold" fill="#d84315">SANCTUM</text>
      
      {/* Entry */}
      <rect x="375" y="450" width="50" height="30" fill="#3b82f6" />
      <text x="400" y="470" textAnchor="middle" className="text-xs font-bold" fill="#fff">ENTRY</text>
      
      {/* Exit */}
      <rect x="375" y="120" width="50" height="30" fill="#3b82f6" />
      <text x="400" y="140" textAnchor="middle" className="text-xs font-bold" fill="#fff">EXIT</text>
      
      {/* Queue Zones */}
      <rect x="150" y="200" width="80" height="200" fill="#22c55e" opacity="0.3" />
      <text x="190" y="310" textAnchor="middle" className="text-xs font-bold" fill="#16a34a">ZONE A</text>
      
      <rect x="570" y="200" width="80" height="200" fill="#22c55e" opacity="0.3" />
      <text x="610" y="310" textAnchor="middle" className="text-xs font-bold" fill="#16a34a">ZONE C</text>
      
      {/* Emergency Exits */}
      <rect x="240" y="280" width="10" height="40" fill="#9ca3af" />
      <rect x="550" y="280" width="10" height="40" fill="#9ca3af" />
      
      {/* Labels */}
      <text x="150" y="180" className="text-xs" fill="#6b7280">Emergency Exit</text>
      <text x="550" y="180" className="text-xs" fill="#6b7280">Emergency Exit</text>
    </svg>
  </div>
)

// Kashi Vishwanath specific map
const KashiVishwanathMap = () => (
  <div className="flex min-h-[500px] items-center justify-center">
    <svg className="h-full w-full max-w-4xl" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="200" y="100" width="400" height="400" stroke="#d84315" strokeWidth="3" fill="#fff" />
      <circle cx="400" cy="300" r="80" fill="#d84315" opacity="0.2" />
      <text x="400" y="310" textAnchor="middle" className="text-sm font-bold" fill="#d84315">JYOTIRLINGA</text>
      <rect x="375" y="500" width="50" height="30" fill="#3b82f6" />
      <text x="400" y="520" textAnchor="middle" className="text-xs font-bold" fill="#fff">ENTRY</text>
    </svg>
  </div>
)

// Tirupati specific map
const TirupatiMap = () => (
  <div className="flex min-h-[500px] items-center justify-center">
    <svg className="h-full w-full max-w-4xl" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="150" y="100" width="500" height="400" stroke="#d84315" strokeWidth="3" fill="#fff" />
      <rect x="325" y="200" width="150" height="200" fill="#d84315" opacity="0.2" />
      <text x="400" y="310" textAnchor="middle" className="text-sm font-bold" fill="#d84315">VENKATESWARA</text>
      <rect x="100" y="250" width="50" height="100" fill="#22c55e" opacity="0.3" />
      <text x="125" y="310" textAnchor="middle" className="text-xs font-bold" fill="#16a34a">ZONE A</text>
    </svg>
  </div>
)

// Madurai specific map
const MaduraiMap = () => (
  <div className="flex min-h-[500px] items-center justify-center">
    <svg className="h-full w-full max-w-4xl" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="200" y="100" width="400" height="400" stroke="#d84315" strokeWidth="3" fill="#fff" />
      <rect x="300" y="200" width="100" height="100" fill="#d84315" opacity="0.2" />
      <text x="350" y="260" textAnchor="middle" className="text-xs font-bold" fill="#d84315">MEENAKSHI</text>
      <rect x="400" y="200" width="100" height="100" fill="#d84315" opacity="0.2" />
      <text x="450" y="260" textAnchor="middle" className="text-xs font-bold" fill="#d84315">SUNDARESWARAR</text>
    </svg>
  </div>
)

// Puri specific map
const PuriMap = () => (
  <div className="flex min-h-[500px] items-center justify-center">
    <svg className="h-full w-full max-w-4xl" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="200" y="100" width="400" height="400" stroke="#d84315" strokeWidth="3" fill="#fff" />
      <rect x="325" y="225" width="150" height="150" fill="#d84315" opacity="0.2" />
      <text x="400" y="310" textAnchor="middle" className="text-sm font-bold" fill="#d84315">JAGANNATH</text>
      <rect x="375" y="500" width="50" height="30" fill="#3b82f6" />
      <text x="400" y="520" textAnchor="middle" className="text-xs font-bold" fill="#fff">ENTRY</text>
    </svg>
  </div>
)

export default TempleMap
