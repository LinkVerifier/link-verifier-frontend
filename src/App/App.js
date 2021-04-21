import {
  BrowserRouter as Router,
} from "react-router-dom";
import Routes from "../pages/Routes";
import './App.scss'

function App(props) {
  return (
    <div className="app-container">
      <Router>
        <Routes/>
      </Router>
    </div>
  );
}

export default App;
