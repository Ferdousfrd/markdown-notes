import React, { useState, useEffect } from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import Split from "react-split";
import { onSnapshot, addDoc, doc, deleteDoc, setDoc } from "firebase/firestore";
import { notesCollection, db } from "./config/firebase";

export default function App() {
    const [notes, setNotes] = useState([])
    const [currentNoteId, setCurrentNoteId] = useState("")
    const [tempNoteText, setTempNoteText] = useState("")

    const sortedNotes = notes.sort((a,b) => {                   // sorting the notes from recnt updated to old ones
        return new Date(b.updatedAt) - new Date(a.updatedAt)
    })


    // .find method goes thro the notes array to find the first note that matches current id. returns a note obj of matches
    const currentNote = notes.find(note => note.id === currentNoteId) || notes[0]
    
    useEffect(() => {
        const unsubscribe = onSnapshot(notesCollection, function(snapshot){     // creating a function to give us the updated snap or data in firebase store collection when event listener gets triggered
            const notesArray = snapshot.docs.map(doc =>{                        // we create a new array obj with the updated data using map
                return {
                    ...doc.data(),                                              // this would be the body of the data 
                    id : doc.id                                                 // setting id 
                }
            })
            setNotes(notesArray)                                                // setting the notes state with our new array 
        })
        return unsubscribe                                                      // to clean up or stop the event listener on unmount
    }, [])

    useEffect(()=>{
        if(!currentNoteId){
            setCurrentNoteId(notes[0]?.id)                                      
        }
    }, [notes])

    useEffect(()=>{                                         // setting the tempNoteText to our currentNote updates to see realtime update in editor but not sending the data to firebase
        if(currentNote){
            setTempNoteText(currentNote.body)
        }
    },[currentNote])

    useEffect(()=>{                                     // debouncing so firebase doesnt write every keystroke.
        const timeoutId = setTimeout(()=>{
            updateNote(tempNoteText)
        }, 500)
        return ()=> clearTimeout(timeoutId)             // clearing out the effect and reseting the timer for delay
    }, [tempNoteText])
    
    async function createNewNote() {
        const newNote = {
            body: "# Type your markdown note's title here",
            createdAt : Date.now(),
            updatedAt : Date.now()
        }

        const newNoteRef = await addDoc(notesCollection, newNote)               // addDoc returns a promise so used await async. and the returned promise would be a refrence to our newly created note document
        setCurrentNoteId(newNoteRef.id)
    }
    
    async function updateNote(text) {
        const refTask = doc(db, "notes", currentNoteId)             // target the task or doc we updating
        await setDoc(refTask, { body:text, updatedAt:Date.now() }, { merge: true })       // push it to our db with setDoc emthod. it takes the refTask, what to update 
    }
    
    async function deleteNote(noteId) {
        const deleteTaskRef = doc(db, "notes", noteId)              // target or get the duccement or the task we want to delete. doc method returns the refrence to our targeted document 
        await deleteDoc(deleteTaskRef)                              // delete from the database. deleteDoc returns a promise
    }

        
    return (
        <main>
        {
            notes.length > 0 
            ?
            <Split 
                sizes={[30, 70]} 
                direction="horizontal" 
                className="split"
            >
                <Sidebar
                    notes={sortedNotes}
                    currentNote={currentNote}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                    deleteNote={deleteNote}
                />
                {
                <Editor 
                    tempNoteText={tempNoteText} 
                    setTempNoteText={setTempNoteText} 
                />
                }

            </Split>
            :
            <div className="no-notes">
                <h1>You have no notes</h1>
                <button 
                    className="first-note" 
                    onClick={createNewNote}
                >
                    Create one now
                </button>
            </div>
            
        }
        </main>
    )
}
