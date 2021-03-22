import promoLogo from '../../images/promo-logo.svg'

export default function Promo() {
  return (
    <section className='promo'>
      <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
      <img src={promoLogo} className='promo__logo' alt='Логотип баннера' />
    </section>
  )
}
