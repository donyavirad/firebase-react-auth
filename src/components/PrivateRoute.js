import React from 'react'
import { Navigate, Route } from 'react-router-dom'
import { useAuth } from '../context/Authcontext'
import Dashboard from './Dashboard'
export default function PrivateRoute(props) {
    const {currentUser} = useAuth()
  return (
    currentUser ? props.element : <Navigate to={props.to}/>
  )
}
