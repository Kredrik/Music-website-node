let artists
let albums
start()
async function start() {
  await getData()
  render()
}

async function getData() {
  artists = await (await fetch('/api/artists/?order=name')).json()
  albums = await (await fetch('/api/albums/?order=name')).json()
}

function render() {
  let html = ''

  for (let artist of artists) {
    html += `
    <h2 class="titleArtist">${artist.name}</h2>
    <h3>Description:</h3>
    <p>${artist.description}</p>

    <a href="albums.html?${artist.id}">
    <p>
    <b>View Albums</b> 
    </p>
    </a>
    `
  }
  document.querySelector('main').innerHTML = html
}
