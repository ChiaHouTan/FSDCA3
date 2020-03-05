import React              from 'react';
import urlToCurrentDomain from '../lib/urlToCurrentDomain';
import {navigate, Link}             from '@reach/router';
import * as Config        from '../config.json';
import '../components/sass/AllScss.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';

class Consoles extends React.Component {

  // #######################################################
  // # Local state
  // #######################################################

  state = {}

  // #######################################################
  // # Render
  // #######################################################

  render() {

    if (!this.state.consoles && this.state.consolesLoaded === true) {
      return (
        <p>Error loading consoles. Try again later.</p>
      );
    } else if (!this.state.consoles) {
      return (
        <p>Loading consoles...</p>
      );
    } else if (this.state.consoles.length === 0) {
      return (
        <p>Sorry, no consoles are available</p>
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
          <h1>Consoles Database</h1>
          

<Table striped bordered hover>
  <thead>
    <tr>
      <th>Image</th>
      <th>Name</th>
      <th>Stock</th>
      <th>Edit Stock</th>
      <th>Edit</th>
      <th>Delete</th>
    </tr>
  </thead>

  <tbody >

  {this.state.consoles.map(console => (
  
    <tr key={`console_${console._id}`}>
    <td ><img class="CImage"src={console.image} alt="console Image"></img></td>
    <td>{console.name}</td>
    <td>{console.stock}</td>
    <td><Link to={`/edit-stock/${console._id}`}><button>Edit</button></Link></td>
    <td><Link to={`/edit-console/${console._id}`}><button>Edit</button></Link></td>
    <td ><button type="submit" onClick={() => { this.handleDelete(console._id) }} className="delete-btn">Delete</button></td>
    </tr>
 

   ))} 

   
  </tbody>

 
</Table>



          <p><Link to='/add-console'><button class="textBold">Add a new Console</button></Link></p>
        </div>
       </body> 
      )
    }
  }


  

  handleDelete(e) {


    // Perform a POST call for the new data
    fetch(urlToCurrentDomain(`${Config.consolesAPI}/`+ e), {
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
      .then (json => navigate(``))
      .then (json => navigate(`/`))
      .catch(err => {
        this.setState({reportedError: err.message || 'Unknown'});
      })

      

  }

  componentDidMount() {
    fetch(urlToCurrentDomain(Config.consolesAPI))
      .then (res  => res.json())
      .then (json => {
        this.setState({consoles       : json});
        this.setState({consolesLoaded : true});
      })
      .catch(err => {
        this.setState({consolesLoaded: true});
      });
  }

  

}

export default Consoles;

