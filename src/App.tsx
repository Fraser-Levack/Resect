import './App.css'
import { useState, useEffect } from 'react';
import { database } from './firebase.ts'; // Assuming your config file is in the same directory
import { ref, onValue, set, push } from 'firebase/database';

function App() {
    const [data, setData] = useState({});
    const [inputValue, setInputValue] = useState('');
    const [forumStyle, setForumStyle] = useState({ display : "none" });
    const [entryStyle, setEntryStyle] = useState({ display : "block" });

    useEffect(() => {
        const dbRef = ref(database, 'messages'); // Replace with your actual path
        onValue(dbRef, (snapshot) => {
            setData(snapshot.val());
        });
    }, []);

    const checkPassword = () => {
        const passwordRef = ref(database, 'password');
        onValue(passwordRef, (snapshot) => {
            const storedPassword = snapshot.val();
            if (inputValue === storedPassword) {
                setForumStyle({ display: "block" });
                setEntryStyle({ display: "none" });
                // clear input value
                setInputValue('');
            } else {
                alert('Incorrect password');
                setInputValue('');
            }
        });
    };

    const handlePostMessage = () => {
        const dbRef = ref(database, 'messages');
        const newItemRef = push(dbRef);
        const currentTime = new Date().toLocaleTimeString([], { day : '2-digit', month:'2-digit', hour: '2-digit', minute: '2-digit' }); // Get the current time without seconds
        set(newItemRef, {
            time: currentTime,
            value: inputValue
        }).then(() => console.log('New item added!'));
    };



    return (
        <>
            <section className={"entry-pass"} style={entryStyle}>
                <p> Enter Password </p>

            </section>
            <section className={"forum"} style={forumStyle}>
                <h1>Resect Soc</h1>
                {data && Object.keys(data).length > 0 && (
                    <ul>
                        {Object.entries(data).map(([key, value]) => {
                            const item = value as { time: string, value: string };
                            return <li key={key}>{item.time}: {item.value}</li>;
                        })}
                    </ul>
                )}

            </section>
            <section className={"entry-section"}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter value"
                />
                <button className={"forum"} onClick={handlePostMessage} style={forumStyle}>Post Message</button>
                <button className={"entry-pass"} onClick={checkPassword} style={entryStyle}>Submit</button>
            </section>
        </>
    )
}

export default App