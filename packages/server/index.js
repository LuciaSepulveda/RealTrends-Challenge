const http = require ("http")
const express = require ("express")
const socketio = require("socket.io")
const tmi = require("tmi.js")
const cors = require('cors')
const {Socket} = require("dgram")

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(cors())

io.on("connection", (socket) => {

    let votes = []
    let channel = ""

    socket.emit("state", votes)
    socket.on("set-channel", (c) => {
        channel = c
        console.log("Channel: " + channel)
        const client = new tmi.client({
            channels: [channel]
        })

        client.connect()
        client.on("message", (_target, context, message) => {
            const user = context["display-name"]
            if (message.startsWith("!A")) {
                const [, review] = message.split("!A")
                votes = votes
                .filter((vote) => vote.user !== user)
                .concat({
                    user,
                    option: "A",
                    review: review.trim() || `Vote por A`
                })
            }
            else {
                if (message.startsWith("!B")) {
                    const [, review] = message.split("!B")
                    votes = votes
                    .filter((vote) => vote.user !== user)
                    .concat({
                        user,
                        option: "B",
                        review: review.trim() || `Vote por B`
                    })
                }
            }
           io.emit("state", votes)
        })
    })
})

server.listen(process.env.PORT || 5000, () => console.log("Conectado"))