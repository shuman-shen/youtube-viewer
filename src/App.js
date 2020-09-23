import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import NotFound from "./components/NotFound";
import FavPage from "./pages/FavPage";
import HomePage from "./pages/HomePage";
import PlayerPage from "./pages/PlayerPage";
import ResultPage from "./pages/ResultPage";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/search" component={ResultPage} />
        <Route path="/video/:videoId" component={PlayerPage} />
        <Route path="/fav" component={FavPage} />
        <Route path="/notfound" component={NotFound} />
        <Route path="/" component={HomePage} />
        <Redirect to="/notfound" />
      </Switch>
    </div>
  );
}

export default App;
