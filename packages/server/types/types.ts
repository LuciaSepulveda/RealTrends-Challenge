export interface Serie {
  id: number
  name: string
  poster_path: string
}

export interface Vote {
  user: string
  option: "A" | "B"
  review?: string
}