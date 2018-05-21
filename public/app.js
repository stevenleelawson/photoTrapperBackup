
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
        <button class='delete-photo'>Kill Photo</button>
      </section>`
    )
  })
}

const postPhotos = async () => {
  const inputs = document.querySelectorAll('input');
  const body = {
    title: inputs[0].value,
    photo_url: inputs[1].value
  }
  console.log('enpats', body)
  const response = await fetch('/api/v1/photos', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

}

$('button').on('click', postPhotos)



$( document ).ready(function() {
    getPhotos()
});
