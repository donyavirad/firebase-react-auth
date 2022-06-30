import React, {useRef, useState} from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../context/Authcontext'
import { Link, useNavigate } from "react-router-dom"
export default function UpdateProfile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser,UpdateEmail,UpdatePassword } = useAuth()
    const [email,setEmail]= useState(currentUser.email)
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError("Password do not match!")
        }
        const promises = []
        setLoading(true)
        setError("")
        if(emailRef.current.value !== currentUser.email){
            promises.push(UpdateEmail(emailRef.current.value))
        }
        if(passwordRef.current.value){
            promises.push(UpdatePassword(passwordRef.current.value))
        }
        Promise.all(promises).then(()=>{
            navigate("/")
        }).catch(()=>{
            setError("Failed to update account")
        }).finally(()=> setLoading(false))
    }
  return (
    <>
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>Update Profile</h2>
                {error && <Alert variant='danger'>{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' value={email} onChange={(e)=> setEmail(e.target.value)} ref={emailRef} required/>
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' ref={passwordRef} placeholder="leave blank to keep same."/>
                    </Form.Group>
                    <Form.Group id="password-confirm">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type='password' ref={passwordConfirmRef} placeholder="leave blank to keep same."/>
                    </Form.Group>
                    <Button disabled={loading} className='w-100 text-center mt-2' type='submit'>
                    Update Profile
                    </Button>
                </Form>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
            <Link to="/">Cansel</Link> 
        </div>
    </>
  )
}
