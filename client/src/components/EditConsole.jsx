import React              from 'react';
import {navigate, Link}   from '@reach/router';
import urlToCurrentDomain from '../lib/urlToCurrentDomain';
import * as Config        from '../config.json'

class EditConsole extends React.Component {

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
          <p>Sorry, there was an error creating the Console. The error was: {this.state.reportedError || 'Unknown'}</p>
          <a href='#' onClick={this.resetForRetry.bind(this)}>Try again</a>&nbsp;|&nbsp;
          <Link to='/'>Back to All Consoles</Link>
        </div>
      );
    } else if (this.state.processingAdd) {
      return (
        <div>Editing Console...</div>
      );
    } else {
      return (
        <body>
        <div class="gameList">
        <div class="addStyle">
          <h1 class="textBlue">Edit a Console</h1>
          <form onSubmit={this.handleSubmit.bind(this)}>

            <div class="textBold textWhite">
            <label>console Name: 
                <input type='' value={this.state.name} onChange={this.handleNameUpdate.bind(this)} required/>
              </label><br></br>
              <label>console Image:
                <input type='' value={this.state.image} onChange={this.handleImageUpdate.bind(this)} required/>
               </label><br></br>
              <label>console Stock:
                <input type='' value={this.state.stock} onChange={this.handleStockUpdate.bind(this)} 
                pattern="[0-9]+" required/>
              </label>
            </div>

            {/* <div>
              <label>console Content:
                <textarea value={this.state.content} onChange={this.handleContentUpdate.bind(this)}></textarea>
              </label>
            </div> */}

            <div>
              <input type='submit' value='Update' />
            </div>

          </form>
          <br></br>
          <Link to='/'><button class="textBold">Back to All Consoles</button></Link>
        </div>
        </div>
        </body>
      );
    }
  }

  handleNameUpdate(e) {
    this.setState({name: e.target.value || null});
  }

  handleImageUpdate(e) {
    this.setState({image: e.target.value || null});
  }

  handleStockUpdate(e) {
    this.setState({stock: e.target.value || null});
  }

  handleSubmit(e) {

    // Prevent the default form submit action
    e.preventDefault();

    // Perform a POST call for the new data
    fetch(urlToCurrentDomain(`${Config.consolesAPI}/${this.props.consoleID}`), {
      method : 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name     : this.state.name,
        image    : this.state.image,
        stock : this.state.stock,
      })}
    )
      .then (res  => {
        if (res.status >= 400) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then (json => navigate(`/`))
      .catch(err => {
        this.setState({reportedError: err.message || 'Unknown'});
      })

  }

  resetForRetry() {
    this.setState({reportedError: null});
  }

  componentDidMount() {
    // this.getComments(this.props.consoleID);
  }

}

export default EditConsole;
