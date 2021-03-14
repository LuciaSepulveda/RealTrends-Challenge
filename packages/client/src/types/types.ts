export interface Serie {
  id: number
  name: string
  poster_path: string
}

export enum State {
  Init = "init",
  Pending = "pending",
  Ready = "ready",
}

export interface Vote {
  user: string
  option: "A" | "B"
  review?: string
}
