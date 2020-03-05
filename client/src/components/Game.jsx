import React              from 'react';
import {Link}             from '@reach/router';
import urlToCurrentDomain from '../lib/urlToCurrentDomain';
import * as Config        from '../config.json';
import '../components/sass/AllScss.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';



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
        
        <body>
        <link
        
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
  integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
  crossorigin="anonymous"
/>
        <div class="gameB">

          <table class="textWhite">
           <tr>
             <th colspan="2" class="gameTitle">{this.state.game.title}</th>
           </tr>
           <tr>
             <th>Genre: {this.state.game.genre}</th>
             <th>Date Release: {this.state.game.releaseDate}</th>
           </tr>
          </table>

          <Carousel>
  <Carousel.Item>
  <img src={this.state.game.image} alt="Game Image 1"></img>
  </Carousel.Item>
  
  <Carousel.Item>
  <img src={this.state.game.image2} alt="Game Image 2"></img>
  </Carousel.Item>

  <Carousel.Item>
  <img src={this.state.game.image3} alt="Game Image 3"></img>
  </Carousel.Item>
</Carousel>



          
          <br></br>

          <iframe src={this.state.game.trailer} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

           <br></br>
           <br></br>
          <Button variant="dark"><Link to='/' class="textBold">Back to All games</Link></Button>
          <br></br>
        </div>

        
       </body> 
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
