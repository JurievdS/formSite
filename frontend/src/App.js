import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Route path="/Dashboard" component={Dashboard}/>
    

    </Router>
  );
}

export default App;
