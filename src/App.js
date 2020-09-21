import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import NotMatch from "./components/NotMatch";
import FavPage from "./pages/FavPage";
import HomePage from "./pages/HomePage";
import PlayerPage from "./pages/PlayerPage";
import ResultPage from "./pages/ResultPage";
import Test from "./pages/Test";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/search" component={ResultPage} />
        <Route exact path="/video/:videoId" component={PlayerPage} />
        <Route path="/test/:id" component={Test} />
        <Route exact path="/fav" component={FavPage} />
        <Route exact path="/" component={HomePage} />
        <Route path="/notfound" exact component={NotMatch} />
        <Redirect to="/notfound" />
      </Switch>
    </div>
  );
}

export default App;
