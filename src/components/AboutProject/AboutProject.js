export default function AboutProject() {
  return (
    <section className='about-project'>
      <h2 className='main__title'>О проекте</h2>
      <div className='about-project__description'>
        <div className='about-project__description-container'>
          <p className='about-project__description-title'>Дипломный проект включал 5 этапов</p>
          <p className='about-project__description-text'>Составление плана, работу над бэкендом, вёрстку, добавление
          функциональности и финальные доработки.</p>
        </div>
        <div className='about-project__description-container'>
          <p className='about-project__description-title'>На выполнение диплома ушло 5 недель</p>
          <p className='about-project__description-text'>У каждого этапа был мягкий и жесткий дедлайн, которые
          нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className='about-project__time-line'>
        <div className='about-project__time-line-container'>
          <p className='about-project__time-line-title'>1 неделя</p>
          <p className='about-project__time-line-caption'>Back-end</p>
        </div>
        <div className='about-project__time-line-container about-project__time-line-container_frontend'>
          <p className='about-project__time-line-title about-project__time-line-title_frontend'>4 недели</p>
          <p className='about-project__time-line-caption'>Front-end</p>
        </div>
      </div>
    </section>
  )
}
