function get_rooms(io) {
   let array = Array.from(io.sockets.adapter.rooms)
   let filtered = array.filter(room=>!room[1].has(room[0]))
   let rooms = filtered.map(rooms=>rooms[0])

   return rooms
}

module.exports = get_rooms
