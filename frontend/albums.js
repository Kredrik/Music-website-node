let artistId = +location.search.slice(1)
let albums
let artist

async function getAlbumAndArtist() {
  artist = await (await fetch('/api/artists/' + artistId)).json()
  albums = await (await fetch('/api/where/albums', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      where: 'artistId = ' + artistId
    })
  })).json()
  render()
}

function render() {
  let html = `
  <div class="textBox_Albums">
  <h2>${artist.name}</h2>`
  for (album of albums) {
    html += `
    <h2 class="titleAlbum">${album.name}</h2>
    <h3>Released: ${album.dateOfRelease}</h3>
    `
  }
  if (albums.length === 0) {
    html += 'This artist does not have any albums yet!'
  }
  html += '</div>'
  document.querySelector('.albums').innerHTML = html
}
getAlbumAndArtist()