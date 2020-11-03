import React from 'react'
import firebase from 'firebase'
import { Switch,  Route, Redirect } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Categories from './pages/Categories'
import Record from './pages/Record'
import Planning from './pages/Planning'
import History from './pages/History'
import Details from './pages/Details'
import PrivateRoute from './components/router/PrivateRoute'
import Loader from './components/app/Loader'



const useRoutes = () => {

    const [authentication, setAuthState] = React.useState({
        authenticated: false,
        initializing: true
      });
    
      React.useEffect(()=>firebase.auth().onAuthStateChanged(user => {
        if (user) {
          setAuthState({
            authenticated: true,
            initializing: false
          });
        } else {
          setAuthState({
            authenticated: false,
            initializing: false
          });
        }
      }), [setAuthState]);
    
    if (authentication.initializing) {
      return <Loader />
    }

    return (
        <Switch>
            <Route path='/login' exact>
                <Login />
            </Route>
            <Route path='/register' exact>
                <Register />
            </Route>
            <PrivateRoute component={Profile} path='/profile' authenticated={authentication.authenticated} exact />
               
            <PrivateRoute component={Categories} path='/categories' authenticated={authentication.authenticated} exact />
                
            <PrivateRoute component={Planning} path='/planning' authenticated={authentication.authenticated} exact />
              
            <PrivateRoute component={Record} path='/record' authenticated={authentication.authenticated} exact />
                
            <PrivateRoute component={History} path='/history' authenticated={authentication.authenticated} exact />
               
            <PrivateRoute component={Details} path='/details/:id' authenticated={authentication.authenticated} exact />
                
            <PrivateRoute component={Home} path='/' authenticated={authentication.authenticated} exact />

            <Redirect to='/login' />
        </Switch>
    )
}



export default useRoutes