//const token = process.env.API_KEY
const token = "8636479b995d6c79186f05c1ed916d34"

export const URL = `https://api.themoviedb.org/3/tv/popular?api_key=${token}&language=en-US&page=1`

export const headers = {
  Authorization: "Bearer " + token,
  "Content-Type": "application/json",
}

export const urlImage = "https://image.tmdb.org/t/p/w500"
