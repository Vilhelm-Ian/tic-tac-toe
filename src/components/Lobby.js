import { io } from "socket.io-client";
import {useState, useEffect} from "react" 
import Game from "./Game.js"
import Loading from "./Loading.js" 
const socket = io();


socket.connect()


 
function Lobby() {
  let [name, setName] = useState("")
  let [starting, setStarting] = useState(false)
  let [player, setPlayer] = useState(undefined)
  let [opponentName, setOpponentName] = useState("")
  let [loading, setLoading] = useState(false)
  let [didHeDisconnect, setDidHeDisconnect] = useState(false)
  let [move, setMove] = useState({
  player: undefined,
  x: undefined,
  y: undefined
  })

  useEffect(()=>{
   let name = localStorage.getItem("name")
   if(name!==undefined) {
     setName(name)
   }
  },[]) 

  socket.on("leaving",()=>{
  setDidHeDisconnect(true)
  setStarting(false)
  setLoading(false)
  })
	 
  

  socket.on("starting", () => {
    socket.emit("name",name)
    setStarting(oldStarting=>true)
  });

  socket.on("player_joined",(player)=>{
    setPlayer(player)
  })

  socket.on("name",(name)=>{
    setOpponentName(name)
  })

  socket.on("move",(data)=>{
    setMove(()=>{
      return {
    player: data.player,
    turn: data.turn
      }
    })
  })

  function submit(e){
  e.preventDefault()
  if(name==="") return
  setLoading(true)
  socket.emit("enter");
  localStorage.setItem("name",name)
  }

  function update(input){	
    if(input.length<8) setName(input)
  }

  let inform_user_opponent_disconnected
  if(didHeDisconnect) inform_user_opponent_disconnected = <p>Sorry opponent left the game</p>

  if(starting) return <Game key="3" name={name} opponentName={opponentName} socket={socket} move={move}  player={player}/>
    if(loading) return <Loading/>
  else{
  return (
        <div  className="lobby" onSubmit={submit}> 
          {inform_user_opponent_disconnected}
          <form className="form">
            <input className="name" autoFocus value={name} type="text" onChange={e=>update(e.target.value)}/>
            <button className="submit" type="submit" >Submit</button>
          </form>
        </div>
    )
  }
;
}

export default Lobby;
           
           
           
           
           
           
           
           
           
           
           
