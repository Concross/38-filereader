import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';
import createAppStore from '../../lib/store';
import PlayersContainer from '../players-container';
import SettingsContainer from '../settings-container';
import Landing from '../landing';

const store = createAppStore();

export default class App extends React.Component {
  render() {
    return (
      <div className="app-container">
        <Provider store={store}>
          <BrowserRouter>
            <div>
              <h1>Rugby Scout!</h1>
              <nav>
                <ul>
                  <li><Link to="/welcome/signup">Sign up!</Link></li>
                  <li><Link to="/welcome/login">Login!</Link></li>
                  <li><Link to="/players">Players</Link></li>
                  <li><Link to="/settings">Settings</Link></li>
                </ul>
              </nav>
              <main>
                <Route exact path="/welcome/:auth" component={Landing} />
                <Route exact path="/players" component={PlayersContainer} />
                <Route exact path="/settings" component={SettingsContainer} />
              </main>
            </div>
          </BrowserRouter>
        </Provider>
      </div>
    );
  }
}
