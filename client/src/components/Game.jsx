import React              from 'react';
import {Link}             from '@reach/router';
import urlToCurrentDomain from '../lib/urlToCurrentDomain';
import * as Config        from '../config.json'

class Game extends React.Component {

  // #######################################################
  // # Local state
  // #######################################################

  state = {}

  // #######################################################
  // # Render
  // #######################################################

  render() {

    if (!this.state.game && this.state.gameLoaded === true) {
      return (
        <p>Error loading games. Try again later.</p>
      );
    } else if (!this.state.game) {
      return (
        <p>Loading games...</p>
      );
    } else if (this.state.game.length === 0) {
      return (
        <p>Sorry, no games are available</p>
      );
    } else {
      return (
        <div>
          <h1>{this.state.game.title}</h1>
          <Link to='/'>Back to All games</Link>
        </div>
      )
    }
  }

  componentDidMount() {
    fetch(urlToCurrentDomain(`${Config.gamesAPI}/${this.props.gameID}`))
      .then (res  => res.json())
      .then (json => {
        this.setState({game       : json});
        this.setState({gameLoaded : true});
      })
      .catch(err => {
        this.setState({gameLoaded: true});
      });
  }

}

export default Game;
