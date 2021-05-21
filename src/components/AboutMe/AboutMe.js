import studentPhoto from '../../images/student-photo.png';

export default function AboutMe() {
  return (
    <section className='about-me'>
      <h2 className='main__title'>Студент</h2>
      <div className='about-me__profile'>
        <div className='about-me__description'>
          <h3 className='about-me__title'>Евгений</h3>
          <p className='about-me__caption'>Фронтенд-разработчик, 21 год.</p>
          <p className='about-me__text'>Я живу в городе Наро-Фоминск. В данный момент учусь на 4 курсе
            РТУ МИРЭА по специальности информационной безопасности. Недавно начал заниматься
            Веб-разработкой. В дальнейшем планирую развиваться в этой сфере.</p>
          <ul className='about-me__links'>
            <li className='about-me__list-element'>
              <a href='https://twitter.com/egrdv/with_replies' className='about-me__link'>Twitter</a>
            </li>
            <li className='about-me__list-element'>
              <a href='https://github.com/EugeneGordievsky' className='about-me__link'>Github</a>
            </li>
          </ul>
        </div>
        <img src={studentPhoto} alt='Фото студента' className='about-me__photo' />
      </div>
    </section>
  )
}
