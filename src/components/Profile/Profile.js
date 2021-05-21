export default function Profile() {
  return (
    <section className='profile'>
      <h1 className='profile__title'>Привет, Евгений</h1>
      <div className='profile__info'>
        <div className='profile__info-element'>
          <p className='profile__text'>Имя</p>
          <p className='profile__text'>Евгений</p>
        </div>
        <div className='profile__info-element'>
          <p className='profile__text'>Почта</p>
          <p className='profile__text'>pochta@yandex.ru</p>
        </div>
      </div>
      <button type='button' className='profile__edit-button'>Редактировать</button>
      <button type='button' className='profile__exit-button'>Выйти из аккаунта</button>
    </section>
  )
}
