
function Row(props)  {
  function turn(e){
    if(e.target.textContent!=" "||props.is_game_over) return
    props.onGameChange(oldGame=>{
      oldGame[props.row][e.target.id] = props.turn 
      return [...oldGame]
    })
  }
  return (
    <div className="row">
      <div onClick={turn} id="0"   className={`square square--edge square--${props.id}`}>
        {props.game[0]} 
      </div>  
      <div onClick={turn} id="1" className={`square square--${props.id}`}>
        {props.game[1]} 
      </div>  
      <div onClick={turn} id="2" className={`square square--edge square--${props.id}`}>
        {props.game[2]} 
      </div>  
    </div>  
  )
}

export default Row
