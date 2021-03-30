import Login from '../components/forms/Login/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import './App.css';
import AccountBox from '../pages/AccountBox/AccountBox';

function App() {
  return (
    <div className="AppContainer">
      <Router>
          <Switch>
            <Route exact path="/login">
            <AccountBox></AccountBox>
            </Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
