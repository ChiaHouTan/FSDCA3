import React              from 'react';
import {Link}   from '@reach/router';
import urlToCurrentDomain from '../lib/urlToCurrentDomain';
import * as Config        from '../config.json'

class EditGame extends React.Component {

  // #######################################################
  // # Local state
  // #######################################################

  state = {
  }

  // #######################################################
  // # Render
  // #######################################################

  render() {

    if (this.state.reportedError) {
      return (
        <div>
          <h1>Error</h1>
          <p>Sorry, there was an error creating the game. The error was: {this.state.reportedError || 'Unknown'}</p>
          <a href='#' onClick={this.resetForRetry.bind(this)}>Try again</a>&nbsp;|&nbsp;
          <Link to='/'>Back to All games</Link>
        </div>
      );
    } else if (this.state.processingAdd) {
      return (
        <div>Editing game...</div>
      );
    } else {
      return (
        <body>
        <div class="gameList">
        <div class="addStyle">
          <h1 class="textBlue">Edit a Game</h1>
          <form onSubmit={this.handleSubmit.bind(this)}>

            <div class="textBold textWhite">
              <label>game Title: 
                <input type='text' defaultValue={this.state.title} onChange={this.handleTitleUpdate.bind(this)} />
              </label><br></br>
              <label>game Genre:
                <input type='' value={this.state.genre} onChange={this.handleGenreUpdate.bind(this)} />
               </label><br></br>
              <label>game Date Release:
                <input type='' defaultValue={this.state.releaseDate} onChange={this.handleReleaseDateUpdate.bind(this)} pattern="^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$"/>
              </label><p class="textItalic">e.g dd/mm/yyyy</p>
              <label>game Image1:
                <input class="inputImage" type='' value={this.state.image} onChange={this.handleImageUpdate.bind(this)} />
              </label><br></br>
              <label>game Image2:
                <input class="inputImage" type='' value={this.state.image2} onChange={this.handleImage2Update.bind(this)} />
              </label><br></br>
              <label>game Image3:
                <input class="inputImage" type='' value={this.state.image3} onChange={this.handleImage3Update.bind(this)} />
              </label><br></br>
              <label>game Trailer video:
                <input class="inputVideo" type='' value={this.state.trailer} onChange={this.handleTrailerUpdate.bind(this)} pattern="(https://www.youtube.com/embed/)[a-zA-Z0-9]+"/>
              </label><p class="textItalic">e.g https://www.youtube.com/embed/8989ABAB</p><br></br>
            </div>

            {/* <div>
              <label>game Content:
                <textarea value={this.state.content} onChange={this.handleContentUpdate.bind(this)}></textarea>
              </label>
            </div> */}

            <div>
              <input type='submit' value='Add RPG' />
            </div>

          </form>
          <Link to='/'>Back to All games</Link>
        </div>
        </div>
        </body>
      );
    }
  }

  handleTitleUpdate(e) {
    this.setState({title: e.target.value || null});
  }

  handleGenreUpdate(e) {
    this.setState({genre: e.target.value || null});
  }

  handleReleaseDateUpdate(e) {
    this.setState({releaseDate: e.target.value || null});
  }
  handleImageUpdate(e) {
    this.setState({image: e.target.value || null});
  }
  handleImage2Update(e) {
    this.setState({image2: e.target.value || null});
  }
  handleImage3Update(e) {
    this.setState({image3: e.target.value || null});
  }
  handleTrailerUpdate(e) {
    this.setState({trailer: e.target.value || null});
  }

  handleSubmit(e) {

    // Prevent the default form submit action
    e.preventDefault();

    // Perform a POST call for the new data
    fetch(urlToCurrentDomain(`${Config.gamesAPI}/${this.props.gameID}`), {
      method : 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title     : this.state.title,
        genre     : this.state.genre,
        releaseDate : this.state.releaseDate,
        image   : this.state.image,
        image2   : this.state.image2,
        image3   : this.state.image3,
        trailer   : this.state.trailer,
      })}
    )
      .then (res  => {
        if (res.status >= 400) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .catch(err => {
        this.setState({reportedError: err.message || 'Unknown'});
      })

  }

  resetForRetry() {
    this.setState({reportedError: null});
  }

  componentDidMount() {
    // this.getComments(this.props.gameID);
  }

}

export default EditGame;
