import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat(props) {
  // variable and useStates
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // helper functions
  async function sendMessage() {
    if (currentMessage !== "") {
      const messageData = {
        sender: props.username,
        room: props.room,
        message: currentMessage,
        time: `${new Date().getHours()}:${new Date().getMinutes()}`,
      };

      await props.socket.emit("send_message", messageData);
      setMessages((prevValue) => [...prevValue, messageData]);
      setCurrentMessage("");
    }
  }

  useEffect(() => {
    props.socket.on("receive_message", (data) => {
      setMessages((prevValue) => [...prevValue, data]);
    });
  }, [props.socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>

      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messages.map((content) => (
            <div
              className="message"
              id={content.sender === props.username ? "you" : "other"}
            >
              <div>
                <div className="message-content">
                  <p>{content.message}</p>
                </div>

                <div className="message-meta">
                  <p id="time">{content.time}</p>
                  <p id="author">{content.sender}</p>
                </div>
              </div>
            </div>
          ))}
        </ScrollToBottom>
      </div>

      <div className="chat-footer">
        <input
          type="text"
          placeholder="Send a message..."
          value={currentMessage}
          onChange={(event) => setCurrentMessage(event.target.value)}
          onKeyDown={(event) => event.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
