import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Routes from "./routing/Routes"

function App() {
  return (
    <Router>
      <main>
        <Route path="/" component={Dashboard} />
        <Routes component={Routes} />
      </main>
    </Router>
  );
}

export default App;
