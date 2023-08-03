const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//ROUTE 1: Get all the notes using: GET "/api/note/getuser".Login required
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  const notes = await Note.find({ user: req.user.id });
  res.json(notes);
});

//ROUTE 2: Adding a note using: POST "/api/note/addnote".Login required
router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter a valid description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      //if there are errors then return bad request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id
      });
      const savedNote = await note.save();
      res.json(savedNote);


    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
  
//ROUTE 3: Update an existing note using: POST "/api/notes/updatenote".Login required
router.put('/updatenote/:id', fetchUser, async(req,res)=>{
    const {title, description, tag}= req.body;
    //Create a newNote object
    const newNote={};
    if(title){newNote.title= title};
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag};

    //Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not found")}

    if(note.user.toString()!== req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note= await Note.findByIdAndUpdate(req.params.id, {$set:newNote}, {new:true})
    res.json(note);
})

//ROUTE 4: Delete an existing note using: DELETE "/api/notes/deletenote".Login required
router.delete('/deletenote/:id', fetchUser, async(req,res)=>{
    const {title, description, tag}= req.body;
    //Create a newNote object
    const newNote={};
    if(title){newNote.title= title};
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag};

    //Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not found")}

    if(note.user.toString()!== req.user.id){
        return res.status(401).send("Not Allowed");
    }
    note= await Note.findByIdAndDelete(req.params.id)
    res.json("Note deleted successfully");
})


module.exports = router;
