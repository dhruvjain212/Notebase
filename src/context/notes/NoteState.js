import {useState} from "react";
import NoteContext from "./noteContext";


const NoteState = (props) => {
  const host= "http://localhost:5000"
 const notesInitial=[]
  const [notes , setNotes]= useState(notesInitial)
  
  //fetching all Notes
  const getNote= async ()=>{
    const response = await fetch(`${host}/api/notes/fetchallnotes `, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const json= await response.json()
    console.log(json)
    setNotes(json)
  }
    //add a note
    const addNote=async (id,title,description,tag)=>{

      const response = await fetch(`${host}/api/notes/addnote `, {
        method: 'POST', 
    
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        
        body: JSON.stringify({title, description, tag}) 
      });
     const json= response.json(); 
    const note= {
      "_id": "62e171bc5d41f712292e4437",
      "user": "62d6dd59b387e25aee89ba17",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2022-07-27T17:11:24.641Z",
      "__v": 0
    };

    setNotes(notes.concat(note));
  }

  //Delete a Note
  const deleteNote= async (id)=>{
    const response = await fetch(`${host}/api/notes/deletenote/${id} `, {
      method: 'DELETE', 
     
  
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
   const json= response.json();
   console.log(json)

      console.log("delete the node with id"+ id);
      const newNotes= notes.filter((note)=>{return note._id!==id});
      setNotes(newNotes);
  }

  //Edit a Note
  const updateNote=async (id,title,description,tag)=>{

    const response = await fetch(`${host}/api/notes/updatenote/${id} `, {
      method: 'POST', 
  
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      
      body: JSON.stringify({title, description, tag}) 
    });
   const json= response.json(); 

      for(let index=0; index<notes.length(); index++){
        const element= notes[index];
        if(element._id===id){
          element.title= title;
          element.description= description;
          element.tag= tag;
        }
      }
  }

  return (
    <NoteContext.Provider value={{notes, addNote, deleteNote, updateNote,getNote}}>
        {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState;
