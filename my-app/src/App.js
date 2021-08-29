import './App.css';
import {ApolloProvider} from '@apollo/client';
import client from './config';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {HomePage, DetailPokemon, MyPokemon} from './pages';
import {TopBar} from './components';

function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
        <div className="App">
          <TopBar />
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/MyPokemon">
              <MyPokemon />
            </Route>
            <Route path="/detail/:name">
              <DetailPokemon />
            </Route>
          </Switch>
        </div>
      </ApolloProvider>
    </Router>
  );
}

export default App;
