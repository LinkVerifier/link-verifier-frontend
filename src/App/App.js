import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import AccountBox from '../pages/AccountBox/AccountBox';
import Home from '../pages/Home/Home';
import Link from "../pages/Link/Link";

function App(props) {
  return (
    <div className="AppContainer">
      <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={AccountBox}/>
            <Route path="/links/:id" component={Link}/>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
