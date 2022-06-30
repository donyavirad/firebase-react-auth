import React, { useContext, useEffect, useState } from 'react'
import firebaseApp from '../firebase'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut, sendPasswordResetEmail, updateEmail, updatePassword} from "firebase/auth"
const AuthContext = React.createContext()

export const useAuth = ()=>{
    return useContext(AuthContext)
}

export  const AuthProvider = (props) =>{
    const [currentUser, SetCurrentUser] = useState()
    const auth = getAuth(firebaseApp)
    const signup =(email,password)=>{
        createUserWithEmailAndPassword(auth,email,password)
    }
    const login = (email,password)=>{
        return signInWithEmailAndPassword(auth,email,password)
    }
    const logOut =()=>{
        return signOut(auth)
    }
    const resetPassword = (email)=>{
        return sendPasswordResetEmail(auth,email)
    }
    const UpdateEmail = (email)=>{
        return updateEmail(auth.currentUser,email)
    }
    const UpdatePassword = (password)=>{
        return updatePassword(auth.currentUser,password)
    }
    useEffect(()=>{
        const unsubscribe = auth.beforeAuthStateChanged((user)=>{
            SetCurrentUser(user)
        })
        return unsubscribe
    },[])
    const value = {
        currentUser,
        signup,
        login,
        logOut,
        resetPassword,
        UpdateEmail,
        UpdatePassword,
    }
  return (
    <AuthContext.Provider value={value}>
        { props.children}
    </AuthContext.Provider>
  )
}
