import React from 'react'
import { Route,Redirect } from 'react-router-dom'
import { useContext } from 'react'  
import AuthContext from '../context/AuthContext'
const PrivateRoute = ({children, ...rest}) => {
    let {auth} = useContext(AuthContext)
    return (
      <Route {...rest}>{!auth ? <Redirect to = "/"/> : children}</Route>
    )
}

export default PrivateRoute
