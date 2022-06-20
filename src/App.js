import "./style.scss"
import Game from "./components/Game.js"
import Lobby from "./components/Lobby.js"
import Nav from "./components/Nav.js"
import {Routes,Route} from "react-router-dom";

function App() {
  return (
        <div> 
          <Nav/>
          <Routes>    
              <Route path="/" element={<Game player="X" key="1" location="local"/>}/>
              <Route path="/local" element={<Game player="X" key="1" location="local"/>}/>
              <Route path="/computer" element={<Game player="X" key="2"  computer={true}/>}/>
              <Route path="/multiplayer" element={<Lobby/>}/>
          </Routes>
        </div>
    )
;
}

export default App;
           
           
           
           
           
           
           
           
           
           
           
