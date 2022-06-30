import { Container } from "react-bootstrap";
import { AuthProvider } from "../context/Authcontext";
import Singup from "./Singup";
import Dashboard from "./Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
function App() {
  return (
    <Container className="d-flex align-items-center justify-content-center "
    style={{minHeight:"100vh"}}>
        <div className="w-100" style={{maxWidth: "400px"}}>
            <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<PrivateRoute element={<Dashboard/>} to="/login"/>}/>
                    <Route path="/update-profile" element={<PrivateRoute element={<UpdateProfile/>} to="/login"/>}/>
                    <Route path="/signup" element={<Singup/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/forgot-password" element={<ForgotPassword/>}/>

                </Routes>
                
            </Router>
            </AuthProvider>
        </div>
    </Container>
  )
}

export default App;
