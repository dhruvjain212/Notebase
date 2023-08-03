import React from 'react'
import Notes from './Notes'
import Alert from './Alert'
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate()
  const handleLogout=()=>{
    localStorage.removeItem('token')
    navigate('/login');
  }

  return (
    <div>
    <Notes/>
    <button type="submit" onClick={handleLogout} className="btn btn-primary">
          Logout
        </button>
    </div>
  )
}

export default Home
