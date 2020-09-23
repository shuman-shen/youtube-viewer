import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import FavPage from "./pages/FavPage";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import NotFound from "./components/NotFound";
import PlayerPage from "./pages/PlayerPage";
import ResultPage from "./pages/ResultPage";
import "react-toastify/dist/ReactToastify.css";

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
