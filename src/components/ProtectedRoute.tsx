import {Navigate} from "react-router-dom"
import { verifyToken } from "../utils/auth"
import { ReactNode, useState } from "react";
import { tokenUtils } from "../utils/token";
import { useEffect } from "react";

interface ProtectedRouteProps {
    children: ReactNode;
  }
  
export default function ProtectedRoute( {children} : ProtectedRouteProps ) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthentication = async () => {
    const userToken = tokenUtils.getToken();

    if (userToken) {
        try {
          const authStatus = await verifyToken(userToken);
          setIsAuthenticated(authStatus);
        } catch (error) {
          console.log(error);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []); 
  
  if (isAuthenticated === null) return <div></div>
  return isAuthenticated? children : <Navigate to="/Search" replace/>
}