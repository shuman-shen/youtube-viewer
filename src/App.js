import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header";
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
        <Route path="/video/:videoId" component={PlayerPage} />
        <Route path="/test/:id" component={Test} />
        <Route exact path="/" component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
