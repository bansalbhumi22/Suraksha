import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBooking } from '../context/BookingContext'
import useTranslation from '../hooks/useTranslation'
import { slotTemplates } from '../data/sampleData'

const SlotAvailability = () => {
  const navigate = useNavigate()
  const { booking, updateBooking } = useBooking()
  const t = useTranslation()
  const [visitDate, setVisitDate] = useState(
    booking.visitDate || new Date().toISOString().split('T')[0]
  )
  const [selectedSlot, setSelectedSlot] = useState(booking.visitSlot || '')

  useEffect(() => {
    if (!booking.temple) {
      navigate('/')
    }
  }, [booking.temple, navigate])

  const handleContinue = () => {
    const payload = {
      visitDate,
      visitSlot: selectedSlot,
    }
    if (!booking.isAuthenticated) {
      updateBooking({
        ...payload,
        pendingPath: '/details',
      })
      navigate('/access')
      return
    }
    updateBooking(payload)
    navigate('/details')
  }

  if (!booking.temple) return null

  return (
    <div className="space-y-8">
      <section className="glass-panel space-y-4">
        <p className="text-sm uppercase tracking-wide text-brand-dusk/60">
          {t('slots.heading')}
        </p>
        <h2 className="section-heading">{t('slots.title')}</h2>
        <p className="text-brand-dusk/70">{t('slots.subtitle')}</p>

        <label className="flex flex-col text-sm font-medium text-brand-dusk/70">
          {t('slots.date')}
          <input
            type="date"
            value={visitDate}
            onChange={(e) => setVisitDate(e.target.value)}
            className="mt-2 rounded-2xl border border-brand-dusk/15 bg-white/80 px-4 py-3 focus:border-brand-saffron focus:outline-none"
          />
        </label>
      </section>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {slotTemplates.map((slot) => {
          const isActive = selectedSlot === slot.label
          return (
            <article
              key={slot.label}
              onClick={() => setSelectedSlot(slot.label)}
              onDoubleClick={handleContinue}
              className={`flex cursor-pointer flex-col gap-3 rounded-3xl border p-6 transition hover:-translate-y-1 hover:shadow-xl ${
                isActive
                  ? 'border-brand-saffron bg-white shadow-lg'
                  : 'border-brand-dusk/10 bg-white/70'
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold text-brand-dusk">{slot.label}</p>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    slot.status === 'available'
                      ? 'bg-brand-teal/15 text-brand-teal'
                      : slot.status === 'few'
                        ? 'bg-brand-saffron/10 text-brand-saffron'
                        : slot.status === 'filling'
                          ? 'bg-brand-saffron/10 text-brand-saffron'
                          : 'bg-rose-50 text-rose-500'
                  }`}
                >
                  {slot.status === 'available'
                    ? 'Available'
                    : slot.status === 'few'
                      ? 'Few left'
                      : slot.status === 'filling'
                        ? 'Filling fast'
                        : 'Waitlist'}
                </span>
              </div>
              <div className="h-2 rounded-full bg-brand-dusk/10">
                <div
                  className={`h-2 rounded-full transition ${
                    slot.status === 'available'
                      ? 'w-1/3 bg-brand-teal'
                      : slot.status === 'few'
                        ? 'w-3/4 bg-brand-saffron'
                        : slot.status === 'filling'
                          ? 'w-2/3 bg-brand-saffron'
                          : 'w-full bg-rose-400'
                  }`}
                />
              </div>
            </article>
          )
        })}
      </div>

      <section className="glass-panel space-y-4">
        <div>
          <p className="text-sm uppercase tracking-wide text-brand-dusk/60">
            {t('slots.inclusive')}
          </p>
          <p className="mt-2 text-sm text-brand-dusk/70">{t('slots.inclusiveCopy')}</p>
        </div>
      </section>

      {selectedSlot && (
        <div className="glass-panel flex flex-col gap-4">
          <div>
            <p className="text-sm uppercase tracking-wide text-brand-dusk/60">Summary</p>
            <h3 className="text-2xl font-semibold text-brand-dusk">
              {booking.temple.name}
            </h3>
            <p className="text-brand-dusk/60">
              {visitDate} · {selectedSlot}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <button
              onClick={handleContinue}
              className="inline-flex items-center justify-center rounded-full bg-brand-orange px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-brand-orange-dark"
            >
              {t('slots.cta')}
            </button>
            <button
              onClick={() => navigate('/booking')}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-lg hover:border-brand-orange hover:text-brand-orange"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Return to Temple Info
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SlotAvailability
