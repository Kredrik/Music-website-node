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
    <div class="artistModule">
    <a href="albums.html?${artist.id}">
    <h2 class="titleArtist">${artist.name}</h2>
    </a>
    <div class="textBox_Artist">
    <h3>Description:</h3>
    <p>${artist.description}</p>
    </div>  
    </div>
    `
  }
  document.querySelector('.listOfArtists').innerHTML = html
}
