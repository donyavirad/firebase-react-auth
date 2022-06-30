import React from 'react'
import { Navigate, Route } from 'react-router-dom'
import { useAuth } from '../context/Authcontext'
import Dashboard from './Dashboard'
const  PrivateRoute = (props) => {
    const {currentUser} = useAuth()
  return (
    currentUser ? props.element : <Navigate to={props.to}/>
  )
}

export default  PrivateRoute