import React , { useState} from 'react'
import { Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../context/Authcontext'
import {Link, useNavigate} from "react-router-dom"
const Dashboard = () => {
    const [error,setError] = useState()
    const {currentUser,logOut} = useAuth()
    const navigate = useNavigate()
    async function handleLogOut () {
        setError("")
        try{
            await logOut()
            navigate("/login")
        }catch{
            setError("Failed Log out")
        }
    }
  return (
    <>
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>Profile</h2>
                {error && <Alert variant='danger'>{error}</Alert>}
                <strong>Email: </strong> {currentUser.email}
                <Link to={"/update-profile"} className="btn btn-primary w-100 mt-3">Update Profile</Link>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
            <Button variant='link' onClick={handleLogOut}>Log Out</Button>
        </div>
    </>
  )
}

export default Dashboard