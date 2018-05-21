$('h1').text('taco')

const getPhotos = async () => {
  try {
    const response = await fetch('/api/v1/photos', { mode: 'no-cors' });
    const photos = await response.json();
    console.log('prooject',photos)
    renderPhotos(photos)
  } catch(error) {
    throw new Error('unable to get projects' + error)
  }
}

const renderPhotos = (photos) => {
  $.each(photos, (index, photo) => {
    console.log('photo', photo)
    $('.photo-section').append(
      `<section class='photo-box'>
        <h1>${photo.title}</h1>
        <img class="image" src=${photo.photo_url} />
      </section>`
    )
  })
}

$( document ).ready(function() {
    getPhotos()
});
