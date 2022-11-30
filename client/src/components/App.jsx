import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./Footer/Footer";
import Navb from "./Navbar/Navbar";
import "../styles.css";
import Main from "../pages/Main";
import Registration from "../pages/Registration";

function App() {
  return (
    <div>
      {/* <Router>
        <Route
          path="/registration"
          exact
          render={(props) => <Registration />}
        />
        <Route path="/" exact render={(props) => <Main />} />
      </Router> */}
      <Navb />
      <Footer />
    </div>
  );
}

export default App;
