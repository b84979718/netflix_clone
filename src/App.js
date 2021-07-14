import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import MovieDetails from './components/MovieDetails'
import Popular from './components/Popular'
import Profile from './components/Profile'
import NotFound from './components/NotFound'
import Search from './components/Search'
import './App.css'

const App = () => (
  <>
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute
          exact
          path="/movies/:page/:id"
          component={MovieDetails}
        />
        <ProtectedRoute exact path="/popular" component={Popular} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute exact path="/search" component={Search} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="not-found" />
      </Switch>
    </BrowserRouter>
  </>
)

export default App
