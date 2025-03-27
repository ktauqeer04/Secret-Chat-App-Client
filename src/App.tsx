import React, { useCallback, useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";


const App = () => {


  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string []>([]);
  const socket = useMemo(() => io("http://localhost:5001"), []);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    socket.emit("temp", message)
  }

  const onMessageReceived = useCallback((msg: string) => {
    console.log("from server", msg);

    try {

      setMessages((prev) => [...prev, msg]);
      
    } catch (error) {
      console.error("Error parsing message:", error);
    }
  
  }, [])

  useEffect(() => {

    socket.on("connect", () => {
      console.log('connected successfully');
    })

    socket.on("temp", (s: string) => {
      console.log(s);
    })

    socket.on("send-message", (s: string) => {
      console.log(s);
    })

    socket.on("message", onMessageReceived)

    return () => {
      socket.disconnect();
      socket.off("message", onMessageReceived);
    }
  }, []);


  return <div>
    <input type="text" value={message} onChange={e => setMessage(e.target.value)}/>
    <button onClick={handleSubmit}></button>
    <div>
      {messages.map((e, index) => (
        <li key={index}>{JSON.parse(e)}</li> 
      ))}
    </div>
  </div>
}

export default App;
