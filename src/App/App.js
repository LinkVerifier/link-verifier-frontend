import Login from '../components/forms/Login/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
  Link,
  browserHistory
} from "react-router-dom";
import AccountBox from '../pages/AccountBox/AccountBox';
import Home from '../pages/Home/Home';

function App(props) {
  return (
    <div className="AppContainer">
      <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={AccountBox}/>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
