import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBooking } from '../context/BookingContext'
import useTranslation from '../hooks/useTranslation'

const VisitorDetails = () => {
  const navigate = useNavigate()
  const { booking, updateBooking } = useBooking()
  const t = useTranslation()

  const [name, setName] = useState(booking.visitors.name || '')
  const [phone, setPhone] = useState(booking.visitors.phone || '')
  const [total, setTotal] = useState(booking.visitors.total || 1)
  const [elders, setElders] = useState(booking.visitors.elders || 0)
  const [differentlyAbled, setDifferentlyAbled] = useState(
    booking.visitors.differentlyAbled || 0
  )
  //const [notes, setNotes] = useState(booking.visitors.notes || '')

  useEffect(() => {
    if (!booking.temple) {
      navigate('/')
    }
  }, [booking.temple, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    updateBooking({
      visitors: {
        name,
        phone,
        total,
        elders,
        differentlyAbled,
        //notes,
      },
      currentBooking: {
        id: `BK-${Math.floor(Math.random() * 10000)}`,
        temple: booking.temple.name,
        city: booking.temple.city,
        date: booking.visitDate,
        slot: booking.visitSlot, 
        // || booking.parkingTime,
        // parking: booking.parkingZone || 'Not selected',
        visitors: {
          name,
          phone,
          total,
          elders,
          differentlyAbled,
        },
      },
    })
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
              Main pilgrim name *
              <input
                type="text"
                value={name}
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
              Total visitors *
              <input
                type="number"
                value={total}
                onChange={(e) => setTotal(parseInt(e.target.value) || 1)}
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
              <strong>Visitors:</strong> {total} 
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
      </form>
    </div>
  )
}

export default VisitorDetails
