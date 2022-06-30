import React, {useRef, useState} from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../context/Authcontext'
import {Link, useNavigate} from "react-router-dom"
export default function Lpgin() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            setError('')
            setLoading(true)
            await login(emailRef.current.value,passwordRef.current.value)
            navigate("/")
        }catch{
            setError("Failed to sign in.")
            setLoading(false)
        }
    }
  return (
    <>
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>Log In</h2>
                {error && <Alert variant='danger'>{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' ref={emailRef} required/>
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' ref={passwordRef} required/>
                    </Form.Group>
                    <Button disabled={loading} className='w-100 text-center mt-2' type='submit'>
                        Log In
                    </Button>
                    <div className='w-100 text-center mt-3'>
                        <Link to={"/forgot-password"}>Forgot Password?</Link>
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
