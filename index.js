let api_key;
async function set_api_key() {
    const response = await fetch("/api_key.txt");
    api_key = await response.text();
  }
  set_api_key();
  

const btn = document.querySelector("#btn")
const inputField = document.querySelector("#input")

async function getImage(query) {
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${query}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`)
    const data = await response.json()
    return data.data
}

async function getFirstImage(query) {
    const data = await getImage(query);
    return data[0].url
}

async function getRandomImage(query) {
    const data = await getImage(query)
    const randomNum = Math.floor(Math.random() * data.length);
    return data[randomNum].url
}

async function getAllImages(query) {
    const data = await getImage(query)
    const arr = []
    for(let i = 0; i < data.length; i++) {
        arr.push(data[i].images.original.url)
    }
    return arr
}


//getAllImages("blue").then(console.log)

function removeAllImages() {
    while (document.querySelector('.grid').firstChild) {
        document.querySelector('.grid').removeChild(document.querySelector('.grid').firstChild);
    }
}

function addImageElement(src) {
    const newImage = document.createElement("img");
    newImage.src = src
    const grid = document.querySelector('.grid');
    grid.appendChild(newImage)
    console.log(src)
}

btn.addEventListener('click', async () => {   
    const allImages = await getAllImages(inputField.value)
    removeAllImages()
    for(let i = 0; i < allImages.length; i++) {
        addImageElement(allImages[i])
    }
})
