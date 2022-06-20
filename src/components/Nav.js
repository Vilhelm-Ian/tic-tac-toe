import { Link } from "react-router-dom";

function Nav() {
  return (
        <nav className="menu">
          <Link to="/local" ><button  className="menu--button menu--button--right-border">Local</button></Link>
          <Link to="/multiplayer" ><button className="menu--button menu--button--right-border">Multiplayer</button></Link>
          <Link to="/computer" ><button className="menu--button">computer</button></Link>
        </nav>
    )
;
}

export default Nav;
