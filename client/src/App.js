import "./App.css";
import { io } from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

// variables
const socket = io("http://localhost:3001");

function App() {
  // variables and useStates
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  // helper functions
  function joinRoom() {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
    }
    setShowChat(true);
  }

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join a chat</h3>
          <input
            type="text"
            placeholder="Enter username..."
            onChange={(event) => setUsername(event.target.value)}
            value={username}
          />
          <input
            type="text"
            placeholder="Enter room ID..."
            onChange={(event) => setRoom(event.target.value)}
            value={room}
          />
          <button
            onClick={() => {
              joinRoom();
              // setUsername("");
              // setRoom("");
            }}
          >
            Join a room
          </button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
