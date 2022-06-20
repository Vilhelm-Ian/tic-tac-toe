export default function Square(props) {
function turn(e){
  let is_local_game = props.location === "/" || props.location === "local" 
  if(e.target.textContent!==" "||props.is_game_over) return
  if(props.player!==props.turn&&!is_local_game) return
  props.onGameChange(oldGame=>{
    if(props.socket !== undefined) props.socket.emit("turn",props.player,{x: props.column, y:props.row})
    oldGame[props.row][props.column] = props.turn 
    return [...oldGame]
  })
}
  
  let row_styles = ["square--top "]
  let highilght
  if(props.game===" ")  highilght = props.is_first_player_to_move ? "first-player" : "second-player"
  return(
    <div onClick={turn} className={`square square--${highilght}  ${ props.column != 1 ? "square--edge " : ""} ${ row_styles[props.row]}`}>
    <p>{props.game}</p>
    </div>
  )
}
