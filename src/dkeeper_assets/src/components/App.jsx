import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
//imports dkeeper code to talk with the ICP blockchain
import { dkeeper } from "../../../declarations/dkeeper"

function App() {
  //frontend updates to user input
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      //call dkeeper code, createNote function and pass the newNote.title and newNote.content
      dkeeper.createNote(newNote.title, newNote.content);
      return [newNote, ...prevNotes];
    });
  }

  //useEffect is called whenever the render is called
  //pass an empty array [] as a second paramenter to avoid infinite loops
  useEffect(() => {
    console.log("useEffect is triggered");
    fetchData();
  }, []);

  //async function within React assigning the notesArray a value that is the output of a function in the dkeeper canister or the main.mo file
  async function fetchData() {
    const notesArray = await dkeeper.readNotes();
    //calling the setNotes function from the useState hook, triggers a rerender
    setNotes(notesArray);
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
