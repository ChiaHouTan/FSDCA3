import React    from 'react';
import {Router} from "@reach/router";
//import Games   from './Games';
import RPGs   from './RPGs';
import Game    from './Game';
import AddRPG from './AddRPG';
import EditGame from './EditGame';
import '../components/sass/AllScss.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

class App extends React.Component {

  render() {
    return (

      

      <div class="gameB">

      <Tabs className="tabStyle" defaultActiveKey="RPG" id="uncontrolled-tab-example">
      <Tab className="tabStyle" eventKey="RPG" title="RPG">
      <Router>
        <RPGs   path='/' />
        <Game    path='/game/:gameID' />
        <AddRPG path='/add-game/' />
        <EditGame path='/edit-game/:gameID' />

      </Router>
      </Tab>
      <Tab className="tabStyle" eventKey="Computers" title="Computers">

      </Tab>
      <Tab className="tabStyle" eventKey="Gaming Accessories" title="Gaming Accessories">

      </Tab>
    </Tabs>
</div>
    );
  }

}

export default App;
