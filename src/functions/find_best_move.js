import {is_it_won} from "./is_won.js"

function Branch(move,game,turn,original){
   this.move = move
   this.game = game 
   this.turn = turn
   this.original = original
   this.result = undefined
   this.setGame = ()=>{
   this.game[this.move.y][this.move.x] = this.turn
   }

   this.setResult = () => {
   if(this.solved) {
      if(this.turn === this.original) this.result = 2
      else this.result = 0
   }
      else if(list_moves(this.game).length===0) this.result = 1
   }

   this.smallerBranch = []
   this.setGame()
   this.solved = is_it_won(this.game)
   this.setResult()
}

function list_moves(game) {
   let move  = []
   for(let y =0 ; y <game.length; y++) {
     for(let x = 0; x < game[0].length; x++) {
         if(game[y][x]=== " ") move.push({y,x})      
     } 
   } 
   return move
}

function destruct_arrays_in_array(array) {
   let result = array.map(arr=>[...arr])
   return result
}

function list_branches(game,turn,original){
   let moves = list_moves(game) 
   let branches = moves.map(move=> new Branch(move,destruct_arrays_in_array(game),turn,original))
   branches = branches.map(branch=> {
      if(!branch.solved && list_moves(branch.game).length !== 0) branch.smallerBranch.push(...list_branches(branch.game,turn === "X" ? "O" : "X",original))
      return branch
   })
   return branches
}



function solve_all_branches(branches){
   for(let i = 0; i<branches.length; i++) {
      if(branches[i].result === undefined) {
      branches[i].result = solve_all_branches(branches[i].smallerBranch)
      }
   }
   let results = branches.map(branch=>branch.result)
   return (branches[0].turn === branches[0].original) ? Math.max(...results) : Math.min(...results)
   }

function find_best_move(game,turn) {
  let all_branches = list_branches(game,turn,turn)
  solve_all_branches(all_branches)
   let result = all_branches.reduce((prev,current)=>{
      return (prev.result>current.result) ? prev : current
   })
  return result.move 
    
}
 
 
export {
list_moves,
list_branches,
Branch,
solve_all_branches,
find_best_move
}
