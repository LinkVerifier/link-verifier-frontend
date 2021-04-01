import Login from '../components/forms/Login/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
  Link,
} from "react-router-dom";
import './App.css';
import AccountBox from '../pages/AccountBox/AccountBox';
import Home from '../pages/Home/Home';

function App(props) {
  return (
    <div className="AppContainer">
      <Router>
          <Switch>
            <Route 
              exact path="/" 
              render={(props) => <Home {...props} />} 
            />
            <Route
              exact path="/login"
              render={(props) => <AccountBox {...props} />}
            />
          </Switch>
      </Router>
    </div>
  );
}

export default App;
