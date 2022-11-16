import './styles/welcome.css'
import {BrowserRouter as Router, Switch, Route, useNavigate} from 'react-router-dom';
import Login from "./pages/login";

function App() {
  
  return (
    // <Router>
    //   <div className = "main">
    //       <h1 className = "header"> Welcome to Taumy! </h1>
    //       <div className = "buttons">
    //           <button className="login" type="submit"> Login </button>
    //           <button className="signup" type="submit"> Signup </button>
    //       </div>
    //   </div>
    // </Router>
    <Login/>
  );
}

export default App;
