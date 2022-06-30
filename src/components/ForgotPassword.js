import React, {useRef, useState} from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../context/Authcontext'
import {Link} from "react-router-dom"
const ForgotPassword = () => {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState()
    const [message, setMessage] = useState()
    const [loading, setLoading] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            setError('')
            setLoading(true)
             await resetPassword(emailRef.current.value)
             setMessage("Check your inbox further instructions.")
        }catch{
            setError("Failed to reset password.")
            setLoading(false)
        }
    }
  return (
    <>
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>Reset Password</h2>
                {error && <Alert variant='danger'>{error}</Alert>}
                {message && <Alert variant='success'>{message}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' ref={emailRef} required/>
                    </Form.Group>
                    <Button disabled={loading} className='w-100 text-center mt-2' type='submit'>
                        Reset Password
                    </Button>
                    <div className='w-100 text-center mt-3'>
                        <Link to={"/login"}>Login</Link>
                    </div>
                </Form>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
            Need to an account? <Link to='/signup'>Sign Up</Link>
        </div>
    </>
  )
}

export default  ForgotPassword