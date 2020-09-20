import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import SearchPage from "./pages/SearchPage";
import PlayerPage from "./pages/PlayerPage";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={SearchPage} />
        <Route path="/video/:videoId" component={PlayerPage} />
      </Switch>
    </div>
  );
}

export default App;
