const express = require('express');
const app = express();
const http = require('http');
const path = require("path")
const server = http.createServer(app);
const get_rooms = require("./get_rooms.js")
const {
    Server
} = require("socket.io");
const io = new Server(server);
const publicPath = path.join(__dirname, "..", "build") 
const port = process.env.PORT || 3001

app.use(express.static(publicPath))

app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath,"index.html"));
});



io.on('connection', (socket) => {
    let room = get_room()

    socket.on("disconnecting", () => {
        console.log("somebody disconnected")
        socket.to(get_room()).emit("leaving")
        io.socketsLeave(Array.from(socket.rooms)[1])
    })

    socket.on("enter", (name) => {
        let rooms = [0, ...get_rooms(io)]
        let last_room = io.sockets.adapter.rooms.get(rooms.at(-1))
        if (last_room === undefined || Array.from(last_room).length === 2) {
            socket.emit("player_joined", "X")
            socket.join(rooms.at(-1) + 1)
        } else {
            socket.emit("player_joined", "O")
            socket.join(rooms.at(-1));
            io.to(rooms.at(-1)).emit("starting")
            console.log("hi")
        }
        console.log(io.sockets.adapter.rooms)
    });
    socket.on("turn", (player, turn) => {
        let room = get_room()
        console.log(room)
        socket.to(room).emit("move", {
            player,
            turn
        })
    })

    socket.on("name",(name)=>{
    console.log("name",name)
        socket.to(get_room()).emit("name",name)
    })

    socket.on("new game",()=>socket.to(get_room()).emit("new game"))

    function get_room() {
        let room
        for (let entry of io.sockets.adapter.rooms) {
            let arr = [entry[0], ...Array.from(entry[1])]
            if (arr.length === 3) {
                if (arr.includes(socket.id)) {
                    room = entry[0]
                    console.log(entry)
                }
            }
        }
        return room
    }
});



server.listen(port, () => {
    console.log(`listening on *:${port}`)
})
