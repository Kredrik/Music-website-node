async function fetchAlbums() {
  let albums = await (await fetch('/api/albums?order=name')).json()

  let htmlList = ''
  for (let album of albums) {
    htmlList += `
    <option value="${album.id}">${album.name}</option>
    `
  }
  document.querySelector('form[name="editOrRemoveAlbum"] select[name="id"]').innerHTML += htmlList
}
fetchAlbums()

document.querySelector('form[name="editOrRemoveAlbum"] div[class="submitButtons"]')
  .addEventListener('click', async function (event) {
    event.preventDefault()

    let submitButton = event.target.closest('input')
    let formPackage = {}
    let elements = document.forms.editOrRemoveAlbum.elements

    for (element of elements) {
      if (element.type === 'submit' || element.value === '') { continue }
      formPackage[element.name] = element.value
      console.log(element.name + ': ' + element.value)
    }

    if (submitButton.value === 'Edit album') {

      let result = await (await fetch('/api/albums/' + formPackage.id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formPackage)
      })).json()
      location.href = 'edit-remove-album.html'
    }
    else if (
      submitButton.value === 'Delete album' &&
      formPackage.id &&
      confirm('Are you sure you want to delete this album? This process is irreversible!')) {

      let result = await (await fetch('/api/albums/' + formPackage.id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      }))
      location.href = 'edit-remove-album.html'
    }
    else {
      alert(!formPackage.id ? 'You need to select an album to proceed!' :
        'Process cancelled!')
    }
  })