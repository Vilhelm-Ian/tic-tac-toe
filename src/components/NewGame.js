import new_game from "../functions/new_game.js"

function NewGame(props) {
  function newGame() {
    new_game(props.setGame)
    if(props.socket!==undefined) props.socket.emit("new game")
  }   
  
  return (
      <button className={`new-game new-game--${props.game_over}`} onClick={newGame}><p>New Game</p></button>
    )
;
}

export default NewGame;
