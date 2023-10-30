require('dotenv').config();

// Print out value of API key stored in .env file
console.log(process.env.API_KEY)


async function getImage(query) {
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${query}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`)
    const data = await response.json()
    return data.data[0].url
}

getImage("hello").then(console.log)