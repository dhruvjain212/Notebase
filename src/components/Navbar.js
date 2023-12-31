import React, {useEffect} from 'react'
import { Outlet,Link,useLocation } from "react-router-dom";


const Navbar = () => {
  let location = useLocation();
  
    useEffect(() => {
     console.log(location);
    }, [location]);

  return (
    <>
    <nav className="navbar navbar-expand-lg bg-light">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">Navbar</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname==="/home"?"active":""}`} aria-current="page" to="/home">Home</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
          </li>
         
         
        </ul>
        <form className="d-flex" role="search">
        <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
        <Link className="btn btn-primary mx-1" to="/signup" role="button">Sign up</Link>
        </form>
      </div>
    </div>
  </nav>
   <Outlet />
   </>
  )
}

export default Navbar
