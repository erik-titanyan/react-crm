import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';


const PrivateRoute = ({component: Component, exact, path, authenticated, init}) => {
  return (
    <Route 
      path={path}
      exact={exact}
      render={props =>
          authenticated 
          ? <Component {...props}  />
          : <Redirect to='/login' />
          }
        />
  )
}



export default connect()(PrivateRoute)