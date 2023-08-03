import React, {useContext, useEffect, useRef } from 'react'
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
    
    const context = useContext(noteContext);
    const navigate = useNavigate();
    const {notes, getNote}= context;
    useEffect(()=>{
      if(localStorage.getItem('token')){
        getNote()
      }
      else{
        navigate('/login');
      }
    },[])

    const updateNote=(note)=>{
       Ref.current.click();
    }
    const Ref= useRef(null)
  return (
    <>
    <AddNote/>

   
<button ref={Ref} type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
       
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

    <div className='row my-3'>
       <h1>Your notes</h1>
       {notes.map((note)=>{
        return <NoteItem key={note._id} updateNote={updateNote} note={note}/>
      })}
    </div>
    </>
  )
}

export default Notes


