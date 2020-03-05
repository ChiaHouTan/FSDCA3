import React    from 'react';
import {Router} from "@reach/router";
//import Games   from './Games';
import Games   from './Games';
import Game    from './Game';
import AddGame from './AddGame';
import EditGame from './EditGame';
import Consoles   from './Consoles';
import AddConsole from './AddConsole';
import EditConsole from './EditConsole';
import EditStock from './EditStock';
import Logo from '../components/logo/PSStore.png';
import '../components/sass/AllScss.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';


class App extends React.Component {

  render() {
    return (

      

      <div class="gameB">
      <br></br>
      <header>
        <img class="headerImg" src={Logo}></img><p class="headerText">PlayStation&trade;</p>
      </header>
      <br></br>

      <Tabs className="tabStyle" defaultActiveKey="Games" id="uncontrolled-tab-example">
      <Tab className="tabStyle" eventKey="Games" title="Games">
      <Router>
        <Games   path='/' />
        <Game    path='/game/:gameID' />
        <AddGame path='/add-game/' />
        <EditGame path='/edit-game/:gameID' />

      </Router>
      </Tab>
      <Tab className="tabStyle" eventKey="Consoles" title="Consoles">
      <Router>
        <Consoles   path='/' />
        <AddConsole path='/add-console/' />
        <EditConsole path='/edit-console/:consoleID' />
        <EditStock path='/edit-stock/:consoleID' />

      </Router>
      </Tab>
    </Tabs>
<br></br>
    <footer>
    <p class="textBold textWhite">&copy; PlayStation 4 Games Website, by CHIA HOU TAN.(Full Stack Development CA3)</p>
    </footer>
</div>


    );
  }

}

export default App;
