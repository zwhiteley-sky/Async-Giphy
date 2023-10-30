require('dotenv').config();

// Print out value of API key stored in .env file
console.log(process.env.API_KEY)


async function getImage(query) {
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${query}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`)
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
        arr.push(data[i].url)
    }
    return arr
}


getAllImages("blue").then(console.log)

