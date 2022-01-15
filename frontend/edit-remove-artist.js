async function fetchArtists() {
  let artists = await (await fetch('/api/artists?order=name')).json()

  let htmlList = ''
  for (let artist of artists) {
    htmlList += `
    <option value="${artist.id}">${artist.name}</option>
    `
  }
  document.querySelector('form[name="editOrRemoveArtist"] select[name="id"]').innerHTML += htmlList
}
fetchArtists()

document.querySelector('form[name="editOrRemoveArtist"] div[class="submitButtons"]')
  .addEventListener('click', async function (event) {
    event.preventDefault()

    let submitButton = event.target.closest('input')
    let formPackage = {}
    let elements = document.forms.editOrRemoveArtist.elements

    for (element of elements) {
      if (element.type === 'submit' || element.value === '') { continue }
      formPackage[element.name] = element.value
      console.log(element.name + ': ' + element.value)
    }
    let albums = await (await fetch('/api/where/albums', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        where: 'artistId = ' + formPackage.id
      })
    })).json()

    if (submitButton.value === 'Edit artist') {

      let result = await (await fetch('/api/artists/' + formPackage.id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formPackage)
      })).json()
      location.href = 'edit-remove-artist.html'
    }
    else if (
      submitButton.value === 'Delete artist' &&
      formPackage.id &&
      !albums.length &&
      confirm('Are you sure you want to delete this artist? This process is irreversible!')) {

      let result = await (await fetch('/api/artists/' + formPackage.id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      }))
      location.href = 'edit-remove-artist.html'
    }
    else {
      alert(!formPackage.id ? 'You need to select an artist to proceed!' :
        albums.length ? 'This artist still have albums! Delete the albums first to remove the artist.' :
          'Process cancelled!')
    }
  })

