
document.querySelector('form[name="addArtist"]')
  .addEventListener('submit', async function (event) {

    event.preventDefault()

    let formPackage = {}
    let elements = document.forms.addArtist.elements

    for (element of elements) {

      if (element.type === 'submit') { continue }
      formPackage[element.name] = element.value
      console.log(element.name + ': ' + element.value)
    }

    let result = await (await fetch('/api/artists', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formPackage)
    })).json()

    location.href = 'index.html'
  })