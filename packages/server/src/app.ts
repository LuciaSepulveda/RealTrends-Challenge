import * as io from "socket.io"
import * as tmi from "tmi.js"
import { Vote } from "../types/types"

const server = new io.Server(5000, {
  cors: {
    origin: "http://localhost:3000",
  },
})

let votes: Vote [] = []
let channel: string = ""

server.on("connection", (socket) => {

  socket.emit("state", votes)

  socket.on("set-channel", (c: string) => {
    channel = c
    console.log("Channel: " + channel)
    const client = tmi.client({
    channels: [channel]
})

client.connect()

client.on("message", (_target, context, message) => {
  const user = context["display-name"] as string

    if (message.startsWith("!A"))
    {
      const [, review] = message.split("!A")

      votes = votes.concat({
        user,
        option: "A",
        review: review.trim() || `Vote por A`
      })
    }
    else
    {
      if(message.startsWith("!B"))
      {const [, review] = message.split("!B")
      votes = votes.concat({
        user,
        option: "B",
        review: review.trim() || `Vote por B`
      })
    }
    }

    server.emit("state", votes)
  })
})
  })

/*
  let c = socket.handshake.query["c"]
  channel = c
*/
/*
  const client = tmi.client({
  channels: [channel]
})
*/
/*
client.connect()

client.on("message", (_target, context, message) => {
  const user = context["display-name"] as string

    if (message.startsWith("!A"))
    {
      const [, review] = message.split("!A")

      votes = votes.concat({
        user,
        option: "A",
        review: review.trim() || `Vote por A`
      })
    }
    else
    {
      if(message.startsWith("!B"))
      {const [, review] = message.split("!B")
      votes = votes.concat({
        user,
        option: "B",
        review: review.trim() || `Vote por B`
      })
    }
    }

    server.emit("state", votes)
  })
})
*/
/*
server.on("channel", (c) => {
  channel = c
  console.log("El canal es: " + channel)
})

*/