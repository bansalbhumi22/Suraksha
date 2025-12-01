import { useEffect, useMemo } from 'react'
import QRCode from 'react-qr-code'
import { useNavigate } from 'react-router-dom'
import { useBooking } from '../context/BookingContext'

const Confirmation = () => {
  const navigate = useNavigate()
  const { booking, resetBooking } = useBooking()

  useEffect(() => {
    if (!booking.temple || (!booking.visitSlot && !booking.parkingZone)) {
      navigate('/')
    }
  }, [booking.temple, booking.visitSlot, booking.parkingZone, navigate])

  const qrPayload = useMemo(
    () =>
      JSON.stringify({
        temple: booking.temple?.name,
        date: booking.visitDate,
        slot: booking.visitSlot || booking.parkingTime,
        visitors: booking.visitors.total,
        issuedAt: new Date().toISOString(),
      }),
    [booking],
  )

  const downloadQr = () => {
    const svg = document.getElementById('suraksha-qr')
    if (!svg) return
    const serializer = new XMLSerializer()
    const svgData = serializer.serializeToString(svg)
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'suraksha-pass.svg'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  if (!booking.temple) return null

  return (
    <div className="space-y-8">
      <section className="glass-panel space-y-4">
        <p className="text-sm uppercase tracking-wide text-brand-dusk/60">
          Pass generated
        </p>
        <h2 className="section-heading">Your SurakshaDarshan QR is ready</h2>
        <p className="text-brand-dusk/70">
          Present this QR at entry gates and parking kiosks. Offline download
          ensures connectivity issues never block darshan.
        </p>
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="flex flex-1 flex-col items-center gap-4 rounded-3xl border border-brand-dusk/10 bg-white/90 p-6 text-center shadow-inner">
            <div className="rounded-3xl bg-white p-4 shadow-lg">
              <QRCode id="suraksha-qr" value={qrPayload} size={180} />
            </div>
            <p className="text-sm text-brand-dusk/70">
              #{booking.temple?.id?.toUpperCase()} · {booking.visitDate}{' '}
              {booking.visitSlot || booking.parkingTime}
            </p>
            <div className="flex gap-3">
              <button
                onClick={downloadQr}
                className="rounded-full bg-brand-dusk px-4 py-2 text-sm font-semibold text-white"
              >
                Download QR
              </button>
              <button
                onClick={() => window.print()}
                className="rounded-full border border-brand-saffron px-4 py-2 text-sm font-semibold text-brand-saffron"
              >
                Print slip
              </button>
            </div>
          </div>
          <div className="flex-1 space-y-4">
            <article className="rounded-3xl border border-brand-dusk/10 bg-white/80 p-5 shadow">
              <p className="text-xs uppercase tracking-wide text-brand-dusk/50">
                Temple
              </p>
              <h3 className="text-xl font-semibold text-brand-dusk">
                {booking.temple?.name}
              </h3>
              <p className="text-sm text-brand-dusk/60">{booking.temple?.city}</p>
              <p className="mt-2 text-sm text-brand-dusk/70">
                Slot · {booking.visitDate} ·{' '}
                {booking.visitSlot || 'Parking entry'}
              </p>
            </article>
            <article className="rounded-3xl border border-brand-dusk/10 bg-white/80 p-5 shadow">
              <p className="text-xs uppercase tracking-wide text-brand-dusk/50">
                Visitors
              </p>
              <ul className="mt-2 text-sm text-brand-dusk/70">
                <li>Main pilgrim: {booking.visitors.name || '—'}</li>
                <li>Contact: {booking.visitors.phone || '—'}</li>
                <li>Total: {booking.visitors.total}</li>
                <li>Elders: {booking.visitors.elders}</li>
                <li>Differently abled: {booking.visitors.differentlyAbled}</li>
              </ul>
            </article>
            {booking.parkingZone && (
              <article className="rounded-3xl border border-brand-dusk/10 bg-white/80 p-5 shadow">
                <p className="text-xs uppercase tracking-wide text-brand-dusk/50">
                  Parking
                </p>
                <p className="text-sm text-brand-dusk/70">
                  Zone: {booking.parkingZone}
                </p>
                <p className="mt-1 text-sm text-brand-dusk/70">
                  {booking.parkingTime} hrs · {booking.vehicleType}
                </p>
                <p className="mt-2 text-xs text-brand-dusk/50">
                  * Slot will be assigned upon arrival
                </p>
              </article>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => {
              resetBooking()
              navigate('/')
            }}
            className="rounded-full border border-brand-dusk/20 px-5 py-2 text-sm font-semibold text-brand-dusk"
          >
            Plan another temple
          </button>
          <button className="rounded-full bg-brand-saffron px-5 py-2 text-sm font-semibold text-white">
            Share on WhatsApp
          </button>
        </div>
      </section>
    </div>
  )
}

export default Confirmation

