import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";


const App = () => {


  const [message, setMessage] = useState<string>("");
  const socket = useMemo(() => io("http://localhost:5001"), []);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    socket.emit("temp", message)
  }

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

    return () => {
      socket.disconnect()
    }
  }, []);

  // useEffect(() => {
  //   console.log(message);
  // }, [message])


  return <div>
    <input type="text" value={message} onChange={e => setMessage(e.target.value)}/>
    <button onClick={handleSubmit}></button>
  </div>
}

export default App;
