import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
// import Footer from "../components/general/Footer/Footer";
import AccountBox from '../pages/AccountBox/AccountBox';
import Home from '../pages/Home/Home';
import Link from "../pages/Link/Link";
import Profile from "../pages/Profile/Profile";
import './App.scss'

function App(props) {
  return (
    <div className="app-container">
      <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={AccountBox}/>
            <Route path="/links/:id" component={Link}/>
            <Route path="/users/:id" component={Profile}/>
            <Route path="/profile" component={Profile}/>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
