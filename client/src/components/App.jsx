import React    from 'react';
import {Router} from "@reach/router";
import Games   from './Games';
import Game    from './Game';
import AddGame from './AddGame';

class App extends React.Component {

  render() {
    return (
      <Router>
        <Games   path='/' />
        <Game    path='/game/:gameID' />
        <AddGame path='/add-game/' />
      </Router>
    );
  }

}

export default App;
