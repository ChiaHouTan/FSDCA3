import React              from 'react';
import urlToCurrentDomain from '../lib/urlToCurrentDomain';
import {Link}             from '@reach/router';
import * as Config        from '../config.json'

class Games extends React.Component {

  // #######################################################
  // # Local state
  // #######################################################

  state = {}

  // #######################################################
  // # Render
  // #######################################################

  render() {

    if (!this.state.games && this.state.gamesLoaded === true) {
      return (
        <p>Error loading games. Try again later.</p>
      );
    } else if (!this.state.games) {
      return (
        <p>Loading games...</p>
      );
    } else if (this.state.games.length === 0) {
      return (
        <p>Sorry, no games are available</p>
      );
    } else {
      return (
        <div>
          <h1>All Games in the database</h1>
          <ul>
            {this.state.games.map(game => (
              <li key={`game_${game._id}`}><Link to={`/game/${game._id}`}>{game.title}</Link></li>
            ))}
          </ul>
          <p><Link to='/add-game'>Add a new Game</Link></p>
        </div>
      )
    }
  }

  componentDidMount() {
    fetch(urlToCurrentDomain(Config.gamesAPI))
      .then (res  => res.json())
      .then (json => {
        this.setState({games       : json});
        this.setState({gamesLoaded : true});
      })
      .catch(err => {
        this.setState({gamesLoaded: true});
      });
  }

}

export default Games;

