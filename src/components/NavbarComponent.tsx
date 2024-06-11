import "../css/NavbarComponent.css"
import { verifyToken } from "../utils/auth"
import { Navigate } from "react-router-dom";
import { tokenUtils } from "../utils/token";
import { useState, useEffect } from "react";

export default function Navbar() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuthentication = async () => {
          const userToken = tokenUtils.getToken();
       
          if (userToken) {
            const authStatus = await verifyToken(userToken);
            if (authStatus) setIsAuthenticated(authStatus);
            else setIsAuthenticated(false);
          }
          else setIsAuthenticated(false);
        };
    
        checkAuthentication();
      }, []);
    
    const handleLogout = () => {
        tokenUtils.removeToken();
        return <Navigate to="/Login" replace/>
    }

    if (isAuthenticated === null) return <div></div>

    if (!isAuthenticated) return (
        <ul className="navbar">
            <li className="navbar__element"> <a className="navbar__link" href="Login">Login</a> </li>
            <li className="navbar__element"> <a className="navbar__link" href="Register">Register</a> </li>
            <li className="navbar__element"> <a className="navbar__link" href="Search">Search</a> </li>
        </ul>
    )

    return (
        <>
            <ul className="navbar">
                <li className="navbar__element"> <a className="navbar__link" href="" onClick={handleLogout}>Logout</a></li>
                <li className="navbar__element"> <a className="navbar__link" href="Search">Search</a></li>
                <li className="navbar__element"> <a className="navbar__link" href="Upload">Uplooad Image</a></li>
            </ul>
        </>
    )
}