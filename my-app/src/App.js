import './App.css';
import {ApolloProvider} from '@apollo/client';
import client from './config';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {HomePage} from './pages';
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
          </Switch>
        </div>
      </ApolloProvider>
    </Router>
  );
}

export default App;
