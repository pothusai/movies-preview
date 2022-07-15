import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Lists from "./Pages/list";
import MoviePreview from "./Pages/movie-info";




function App(){
  return (
    <Router>
      <div>
        {/* <nav>
          <ul>
            <li>
              <Link to='/movies-list'>List</Link>
            </li>
            <li>
              <Link to='/movie'>Movie</Link>
            </li>
          </ul>
        </nav> */}
        <Switch>
          <Route path='/movies-list'>
            <Lists />
          </Route>
          <Route path='/movie/:id'>
            <MoviePreview />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;
