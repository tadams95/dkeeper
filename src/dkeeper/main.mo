import List "mo:base/List";
import Debug "mo:base/Debug";

actor DKeeper {

  public type Note =  {
    title: Text;
    content: Text;
  };

  //an array of note objects. but is a list of the note type
  var notes: List.List<Note> = List.nil<Note>();

  public func createNote(titleText: Text, contentText: Text) {
    //newNote object with title and content parameters
    //this info will be called in App.jsx
    let newNote: Note = {
      title = titleText;
      content = contentText;
    };

    //list that addes newNote to the notes array
    notes := List.push(newNote, notes);
    Debug.print(debug_show(notes));
  };

  //passing the notes into the List.toArray and returning the Note array
  public query func readNotes() : async [Note] {
    return List.toArray(notes);
  };

};