import '../css/App.css'
import Login from './LoginPage'
import Register from './RegisterPage'
import Search from "./SearchPage";
import Gallery from './ImageGalleryPage';
import PublicRoute from '../components/PublicRoute'
import ProtectedRoute from '../components/ProtectedRoute';


import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to="/Search" replace/>}/>
          <Route index path='/Search' element={<Search/>}/>
          <Route index path='/Gallery' element={<Gallery/>}/>
          <Route path='/Login' element={<PublicRoute> <Login/> </PublicRoute>}/>
          <Route path='/Register' element={<PublicRoute> <Register/> </PublicRoute>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
