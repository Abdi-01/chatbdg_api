const express = require('express')
const httpServer = require('http')
const cors = require('cors')
const socketIO = require('socket.io')

const PORT = process.env.PORT || 2021

const app = express()
app.use(express.json())
app.use(cors)

// Konfigurasi server socket
const server = httpServer.createServer(app)
const io = socketIO(server)

let arrMsg = []
let user = []

app.get('/', (req, res) => res.status(200).send('<h4>Chat API BDG</h4>'))

io.on('connection', socket => {
    // Untuk membuat koneksi, atau join koneksi
    socket.on('JoinChat', data => {
        console.log(socket.id, data)
        io.emit("notif", `Joined chat user ID ${socket.id}`)
    })
    socket.on("chatMessage", chat => {
        arrMsg.push(chat)
        io.emit("updateMessage", arrMsg)
    })
    // Untuk keluar koneksi
    socket.on('disconnect', () => {

    })
})


server.listen(PORT, () => console.log("Connect to chat API", PORT))