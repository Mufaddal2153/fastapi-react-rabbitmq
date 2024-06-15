import {Switch, Route} from "react-router-dom";

import "./App.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Login from "./components/Login";
import Signup from "./components/Signup";
import Error from "./components/Error";
import VerifyOtp from "./components/verify_otp";
import GenerateOtp from "./components/generate_otp";
import Home from "./components/Home";

function App() {
  return (
    <>
        <div className="App">
            <Switch>
                <Route path="/" component={Login} exact />
                <Route path="/home" component={Home} exact />
                <Route path="/signup" component={Signup} exact />
                <Route path="/error" component={Error} exact />
                <Route path="/verify_otp" component={VerifyOtp} exact />
                <Route path="/generate_otp" component={GenerateOtp} exact />
            </Switch>
        </div>
        <ToastContainer />
    </>
  );
}

export default App;