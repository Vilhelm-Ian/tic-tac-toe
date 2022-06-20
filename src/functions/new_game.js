export default function new_game(setGame){
  setGame(oldGame=>{
  for(let y = 0; y < oldGame.length; y++) {
    for(let x =0 ; x < oldGame[0].length; x++) {
      oldGame[y][x] = " " 
    } 
  }   
    return [...oldGame]
  })
}

