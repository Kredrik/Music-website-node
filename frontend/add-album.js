
async function fetchArtists() {
  let artists = await (await fetch('/api/artists?order=name')).json()

  let htmlList = '';
  for (let artist of artists) {
    htmlList += `
    <option value="${artist.id}">${artist.name}</option>
    `
  }
  document.querySelector('select[name="artistId"]').innerHTML += htmlList
}

fetchArtists()

document.querySelector('form[name="addAlbum"]')
  .addEventListener('submit', async function (event) {

    event.preventDefault()

    let formPackage = {}
    let elements = document.forms.addAlbum.elements

    for (element of elements) {

      if (element.type === 'submit') { continue }
      formPackage[element.name] = element.value
      console.log(element.name + ': ' + element.value)
    }

    console.log(formPackage)

    let result = await (await fetch('/api/albums', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formPackage)
    })).json()

    location.href = 'index.html'
  })