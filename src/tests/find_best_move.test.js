import {list_moves,list_branches, solve_all_branches, find_best_move, Branch} from "../find_best_move.js"
 
it("list available moves", () => {
expect(list_moves([
 ["X","O","X"],   
["O","X","O"],  
 ["X","X"," "]   
])[0],).toStrictEqual({x:2,y:2})
})

 
it("play only available move", () => {
    expect(new Branch({y:2,x:2},[
 ["X","O","X"],   
["O","X","O"],  
 ["X","X"," "]   
],"X","X").game).toStrictEqual([
 ["X","O","X"],   
["O","X","O"],  
 ["X","X","X"]   
])
})
 
 
 it("play only available move 2", () => {
     expect(new Branch({y:1,x:2},[
  ["X","O","X"],   
 ["O","X"," "],  
  ["X","X","O"]   
 ],"X","X").game).toStrictEqual([
  ["X","O","X"],   
 ["O","X","X"],  
  ["X","X","O"]   
 ])
 })
 
 
it("list branches", () => {
expect(list_moves([
 ["X","O","X"],   
["O"," ","O"],  
 ["O","X"," "]   
],"X")).toStrictEqual([{x:1,y:1},{x:2,y:2},])
})
 
     
it("list branches second element", () => {
let branches = list_branches([
 ["X","O","X"],   
["O"," ","O"],  
 ["O","X"," "]   
],"X")   
expect(branches[0].smallerBranch[0].move).toStrictEqual({x:2,y:2})
})   
    
it("list branches stop when won", () => {
expect(list_branches([
 ["X","O","X"],   
["O"," ","O"],  
 ["O","X"," "]   
],"O","O")[0].move,).toStrictEqual({x:1,y:1})
})
 
 
it("find short branch", () => {
expect(list_branches([
 ["O"," "," "],   
[" "," "," "  ],  
 ["O"," "," "]   
],"O","O")[2].move).toStrictEqual({x:0,y:1})
})
 
     
it("is move wining", () => {
expect(list_branches([
 ["O"," "," "],   
[" "," "," "  ],  
 ["O"," "," "]   
],"O","O")[2].result === 2).toBe(true)
})
 
 
 it("list only move", () => {
 expect(list_branches([
 ["X","O","X"],   
 ["O","X","O"],  
 ["X","X"," "]   
 ],"X")[0].solved).toBe(true)
 })



it("find one move", () => {
expect(find_best_move([
 ["X","O","O"],   
 ["O","O","X"],  
 ["X"," ","X"]   
],"X","X")).toStrictEqual({x:1, y: 2})
})

//it("find easy move", () => {
//expect(find_best_move([
// ["X"," "," "],   
// [" "," "," "],  
// ["X"," "," "]   
//],"X")).toStrictEqual({x:0,y:1})
//})

it("find multiple  move", () => {
expect(find_best_move([
 ["X","O"," "],   
 ["O","O","X"],  
 ["X"," "," "]   
],"X")).toStrictEqual({x:1,y:2})
})
//
//it("find solution in two moves", () => {
//expect(find_best_move([
// ["X"," ","O"],   
// [" ","O"," "],  
// [" "," ","X"]   
//],"X","X")).toStrictEqual({x:0, y: 2})
//})
//
//it("find_draw_two moves", () => {
//expect(find_best_move([
// ["X","X","O"],   
// [" ","O"," "],  
// ["X","O","X"]   
//],"O","O")).toBe()
//})
