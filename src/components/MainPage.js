import React from 'react'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { db, auth } from '../firebase';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { set, ref, onValue, query, limitToFirst, orderByChild, onChildAdded } from 'firebase/database';
import { uid } from "uid";
import "./MainPage.css";


const MainPage = () => {
    const [chat, setChat] = useState("");
    const [chatList, setChatList] = useState([]);
    useEffect(() => {
        auth.onAuthStateChanged((user) => {

            if (user) {
                const dbRef = query(ref(db, "messages/"), orderByChild("messagedAt"));
                onValue(dbRef, (snapshot) => {
                    setChatList([]);
                    snapshot.forEach((obj) => {
                        setChatList((old) => [...old, obj.val()]);
                    })
                })
            }
            else if (!user) {
                navigate("/chatApp");
            }

        })
    }, [])

    const navigate = useNavigate();
    const HandleChangeChat = (e) => {
        setChat(e.target.value);
    }

    const HandleClick = () => {
        const ListId = uid();
        let name = auth.currentUser.email;
        name = name.replace(/[0-9]/g, "");
        let indexOfa = name.indexOf("@");
        name = name.substring(0, indexOfa);
        set(ref(db, `messages/${ListId}`), {
            name: name,
            chat: chat,
            uid: ListId,
            isOnline: false,
            email: auth.currentUser.email,
            messagedAt: Date.now(),
        })
        // setChatList([...chatList, { Listid: { chat: chat, uid: ListId, isOnline: false, messagedAt: Date.now() } }]);
        setChat("");
    }
    const HandleLogOut = () => {
        if (auth.currentUser) {
            auth.signOut().then(() => {
                navigate("/chatApp");
            })

        } else {
        }
    }
    return (
        <div>
            <nav className='navbar'>
                <h1>Welcome To Our Chat Room!</h1>
                <button onClick={HandleLogOut}><i class="fa-solid fa-power-off"></i></button>
            </nav>
            <div className="Chat_section">
                <ul className='left'>{(chatList.length === 0) ? null : (chatList.map((obj, index) => {
                    return <li key={index} className={`normal ${obj.email === auth.currentUser.email ? ("send") : ("receive")}`}><div className="username">{obj.name}</div><div className="chat">{obj.chat}</div></li>
                }))}</ul>
                <div className="chat_container">
                    <input type="text" placeholder="Type To Chat!" onChange={(e) => { HandleChangeChat(e) }} value={chat}></input>
                    <button onClick={HandleClick}><i class="fa-solid fa-paper-plane"></i></button>
                </div>
            </div>

        </div >
    )
}

export default MainPage