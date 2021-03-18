const token = import.meta.env.VITE_KEY

export const URL = `https://api.themoviedb.org/3/tv/popular?api_key=${token}&language=en-US&page=1`

export const headers = {
  Authorization: "Bearer " + token,
  "Content-Type": "application/json",
}

export const urlImage = "https://image.tmdb.org/t/p/w500"
