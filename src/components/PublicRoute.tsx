import {Navigate} from "react-router-dom"
import { verifyToken } from "../utils/auth"
import { ReactNode } from "react";
import { tokenUtils } from "../utils/token";
import { useState, useEffect } from "react";

interface PublicRouteProps {
    children: ReactNode;
  }
  
export default function PublicRoute( {children} : PublicRouteProps ) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      const userToken = tokenUtils.getToken();

      if (userToken) {
        try {
          const authStatus = await verifyToken(userToken);
          setIsAuthenticated(authStatus);
        } catch (error) {
          console.error(error);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);

  if (isAuthenticated === null) return <div></div>
  return isAuthenticated ? <Navigate to="/Search" replace/> : children 
}