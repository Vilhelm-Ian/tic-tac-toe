import Square from "./Square.js";
import NewGame from "./NewGame.js";
import React, { useState, useEffect } from "react";
import { is_it_solved, is_it_won } from "../functions/is_won.js";
import new_game from "../functions/new_game.js";
import { find_best_move } from "../functions/find_best_move.js";
import is_game_empty from "../functions/is_game_empty";

function Game(props) {
  const [game, setGame] = useState([
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ]);

  const [gameData, setGameData] = useState({
    turn: "X",
    player: props.player,
    name: props.name,
    is_over: false,
    is_won: false,
    score: {
      player1: 0,
      player2: 0,
    },
  });

  if (props.socket !== undefined) {
    props.socket.on("new game", () => {
      console.log("new game");
      new_game(setGame);
    });
  }

  useEffect(() => {
    setGame((oldGame) => {
      if (props.move === undefined) return oldGame;
      if (props.move.player === undefined) return oldGame;
      oldGame[props.move.turn.y][props.move.turn.x] = props.move.player;
      return [...oldGame];
    });
  }, [props.move]);

  useEffect(() => {
    return () => {
      setGameData((oldGameData) => {
        oldGameData.is_over = is_it_solved(game, oldGameData.turn);
        let number_of_available_moves = game
          .flat()
          .filter((square) => square === " ").length;
        if (number_of_available_moves === 9) {
          oldGameData.turn = "X";
          if (oldGameData.score.player1 !== 0 || oldGameData.score.player2 !== 0){
            oldGameData.player = oldGameData.player === "X" ? "O" : "X";
          }
        } else if (!oldGameData.is_over)
          oldGameData.turn = oldGameData.turn === "X" ? "O" : "X";
        return {
          ...oldGameData,
        };
      });
    };
  }, [game]);

  useEffect(
    (move) => {
      if (props.computer && gameData.turn !== gameData.player) {
        if (is_game_empty(game))
          move = {
            y: Math.floor(Math.random() * 3),
            x: Math.floor(Math.random() * 3),
          };
        else move = find_best_move(game, gameData.turn);
        setGame((oldGame) => {
          oldGame[move.y][move.x] = gameData.turn;
          return [...oldGame];
        });
      }
    },
    [gameData.turn, gameData.player]
  );

  useEffect(() => {
    if (gameData.is_over) {
      setGameData((oldGameData) => {
        let is_first_player_to_move = props.player === "X" ? oldGameData.turn === oldGameData.player : oldGameData.turn !== oldGameData.player
        oldGameData.is_won = is_it_won(game);
        if (is_first_player_to_move) {
           oldGameData.score["player1"] += oldGameData.is_won ? 1 : 0;
        } else {
           oldGameData.score["player2"] += oldGameData.is_won ? 1 : 0;
        }
        if (oldGameData.is_over && !oldGameData.is_won) {
          oldGameData.score.player2 += 0.5;
          oldGameData.score.player1 += 0.5;
        }
        return {
          ...oldGameData,
        };
      });
    }
  }, [gameData.is_over]);

  
  let is_first_player_to_move = props.player === "X" ? gameData.turn === gameData.player : gameData.turn !== gameData.player
  let squares = [];
  for (let i = 0; i < 3; i++) {
    for (let z = 0; z < 3; z++) {
      squares.push(
        <Square
          is_first_player_to_move={is_first_player_to_move}
          location={props.location}
          socket={props.socket}
          computer={props.computer}
          game={game[i][z]}
          turn={gameData.turn}
          onGameChange={setGame}
          is_game_over={gameData.is_over}
          player={gameData.player}
          id="top"
          column={z}
          row={i}
          key={`${i}${z}`}
        />
      );
    }
  }
  let player1 = "player1";
  let player2 = "player2";
  if (gameData.name !== undefined) {
    player1 = props.player === "X" ? props.name : props.opponentName;
    player2 = props.player === "X" ? props.opponentName : props.name;
  }
  else{
  if(props.computer) player2 = "computer"
  if(localStorage.getItem("name")) player1 = localStorage.getItem("name") 
  }
  return (
    <div className="game">
      <div className="game--title">
        <p
          className={
            is_first_player_to_move ? "game--player1--turn" : ""
          }
        >
          {player1}
        </p>
        <p> {`${gameData.score.player1}-${gameData.score.player2}`} </p>
        <p
          className={
            !is_first_player_to_move ? "game--player2--turn" : ""
          }
        >
          {player2}
        </p>
      </div>
      <NewGame
        game_over={gameData.is_over}
        socket={props.socket}
        setGameData={setGameData}
        setGame={setGame}
      />
      <div className="board">
      <div className="grid"> {squares} </div>
      </div>
    </div>
  );
}

export default Game;

