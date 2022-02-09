import { useState, useEffect } from 'react';
import { getUser } from './services/fetch-utils';
import {
  BrowserRouter as Router,
  Switch,
  NavLink,
  Route,
  Redirect,
  Link
} from 'react-router-dom';
import AuthPage from './AuthPage';
import DetailPage from './DetailPage';
import ListPage from './ListPage';
import CreatePage from './CreatePage';

import './App.css';
import { logout } from './services/fetch-utils';

export default function App() {
  // You'll need to track the user in state
  const [currentUser, setCurrentUser] = useState(null);

  // add a useEffect to get the user and inject the user object into state on load
  useEffect(() => {
    async function fetch() {
      const user = await getUser();
      if (user) setCurrentUser(user);
    }
    fetch();
  }, []);

  async function handleLogout() {
    // call the logout function
    // clear the user in state
  }

  return (
    <Router>
      <div className='App'>
        <header>
          {
            currentUser &&
            <ul>
              <li>
                <Link to='/board-games'>List Page</Link>
              </li>
              <li>
                <Link to='/create'>Create Page</Link>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </ul>
          }
          {/* if there is a user in state, render out a link to the board games list, the create page, and add a button to let the user logout */}
        </header>
        <main>
          <Switch>
            <Route exact path="/">
              {
                currentUser
                  ? <Redirect to='list'/>
                  : <AuthPage setCurrentUser={setCurrentUser} />
              }
              {/* if there is a user, redirect to the board games list. Otherwise, render the auth page. Note that the AuthPage will need a function called setUser that can set the user state in App.js */}
            </Route>
            <Route exact path="/board-games">
              {
                !currentUser
                  ? <Redirect to='/'/>
                  : <ListPage />
              }
              {/* if there is a user, render the board games list. Otherwise, redirect to the home route/auth page */}
            </Route>
            <Route exact path="/board-games/:id">
              {
                !currentUser
                  ? <Redirect to='/'/>
                  : <DetailPage />
              }
              {/* if there is a user, render the detail page. Otherwise, redirect to the home route/auth page */}
            </Route>
            <Route exact path="/create">
              {
                !currentUser
                  ? <Redirect to='/'/>
                  : <CreatePage />
              }
              {/* if there is a user, render the create page. Otherwise, redirect to the home route/auth page */}
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}