import { useEffect, useState } from "react";

//Adds a document to a collection

//serverTimestamp - is a timestamp from the firebase which if you call this function set this to be equal to the time which this 
// message is created

//(Different condition from a query) where - theres a function in firestore that allow us to specify uh different condition from our query
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { auth, db } from "../configs/firebase"

export const Chat = (props) => {
    const { room } = props
    const [newMessage, setNewMessage] = useState("")
    const [messages, setMessages] = useState([])
    // Is a reference to the message collection
    // "messages" - is the name of the collection
    // db - which is the database configs which is the firebase
    const messageRef = collection(db, "messages")//collection which is the function that you import  from firestore

    useEffect(() => {
        // First requires a query that we want to listen to write that query:
        const queryMessages = query(
            messageRef,
            where("room", "==", room), // grab a collection where certain condition are met.  // I want query stuff where room is equal to the room that we get from the props
            orderBy("createdAt"))
        //This function requires to things:
        const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id }) // this mean you grab the data from the document by saying doc.data
            });
            setMessages(messages); // THIS function listen to those changes
        });

        return () => unsuscribe();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newMessage === "") return;

        await addDoc(messageRef, {
            text: newMessage,
            //serverTimestamp - is a timestamp from the firebase which if you call this function set this to be equal to the time which this 
            // message is created
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName, //display the name of the user that is be authenticated
            room, // if both things have the same name you dont event have to put the colon over there     
        });
        setNewMessage("")
    };
    return (
        <div className="chat-app">
            <div className="header">
                <h1>Welcome to: {room.toUpperCase()}</h1>
            </div>
            <div className="messages">
                {messages.map((message) => (
                    <div className="message" key={message.id}>
                        <span className="user">{message.user} </span>
                        {message.text}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="new-message-form">
                <input
                    className="new-message-input"
                    placeholder="Type your message here"
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                />
                <button type="submit" className="send-button">
                    Send
                </button>
            </form>
        </div>
    );
};