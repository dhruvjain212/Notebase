import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
// import Alert from './components/Alert';

function App() {
  return (
    <>
    <NoteState>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>

          <Route exact path="/home" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
            
       </Route>
       
      </Routes>
    </BrowserRouter>
    </NoteState>
    </>
  );
}

export default App;
