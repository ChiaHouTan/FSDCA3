import React              from 'react';
import urlToCurrentDomain from '../lib/urlToCurrentDomain';
import {navigate, Link}             from '@reach/router';
import * as Config        from '../config.json';
import '../components/sass/AllScss.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';

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
        <body>
<link  
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossorigin="anonymous"
      />

        <div class="gameB2 gameList">
          <h1>Games Database</h1>
          

<Table striped bordered hover>
  <thead>
    <tr>
      <th>Title</th>
      <th>Date Release</th>
      <th>Edit</th>
      <th>Delete</th>
    </tr>
  </thead>

  <tbody >

  {this.state.games.map(game => (
  
    <tr key={`game_${game._id}`}>
      <td ><Link to={`/game/${game._id}`}>{game.title}</Link> </td>
      <td>{game.releaseDate}</td>
      <td><Link to={`/edit-game/${game._id}`}><button>Edit</button></Link></td>

      <td ><button type="submit" onClick={() => { this.handleDelete(game._id) }} className="delete-btn">Delete</button></td>
      
    </tr>
 

   ))} 

   
  </tbody>

 
</Table>



          <p><Link to='/add-game'><button class="textBold">Add a new Game</button></Link></p>
        </div>
       </body> 
      )
    }
  }


  

  handleDelete(e) {


    // Perform a POST call for the new data
    fetch(urlToCurrentDomain(`${Config.gamesAPI}/`+ e), {
      method : 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },}
    )
      .then (res  => {
        if (res.status >= 400) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then (json => navigate(`/game`))
      .then (json => navigate(`/`))
      .catch(err => {
        this.setState({reportedError: err.message || 'Unknown'});
      })

      

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

