import { useBooking } from '../context/BookingContext'
import { translate } from '../i18n/translations'

const useTranslation = () => {
  const { language } = useBooking()
  return (key, fallback) => translate(key, language) || fallback || key
}

export default useTranslation
