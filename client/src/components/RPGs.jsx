import React              from 'react';
import urlToCurrentDomain from '../lib/urlToCurrentDomain';
import {Link}             from '@reach/router';
import * as Config        from '../config.json';
import '../components/sass/AllScss.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';

class RPGs extends React.Component {

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
        <body>
<link  
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossorigin="anonymous"
      />

        <div class="gameB2 gameList">
          <h1>Role-Playing-Games</h1>
          

<Table striped bordered hover>
  <thead>
    <tr>
      <th>Title</th>
      <th>Date Release</th>
    </tr>
  </thead>

  <tbody >

  {this.state.games.map(game => (
  
    <tr>
      <td key={`game_${game._id}`}><Link to={`/game/${game._id}`}>{game.title}</Link> </td>
      <td>{game.releaseDate}</td>
    </tr>
 

   ))} 

   
  </tbody>

 
</Table>



          <p><Link to='/add-game'>Add a new Game</Link></p>
        </div>
       </body> 
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

export default RPGs;

