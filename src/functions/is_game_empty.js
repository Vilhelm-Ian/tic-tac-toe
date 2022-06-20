function is_game_empty(two_dimensional_array) {
  for(let i = 0; i < two_dimensional_array.length; i++) {
    for(let z = 0; z < two_dimensional_array[0].length; z++) {
       if(two_dimensional_array[i][z]!==" ") return false 
    } 
  } 
  return true
}

export default is_game_empty
