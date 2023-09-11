import React, {
  FC,
  useEffect,
  useRef,
  useState,
} from "https://esm.sh/react@17";
import ReactDOM from "https://esm.sh/react-dom@17";
import { Message, WsMessage } from "./shared.ts";

const App: FC = () => {
  const socket = useRef<WebSocket | null>(null);
  const [name, setName] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const appendMessages = (msg: Message) => {
    setMessages((old) => [...old, msg]);
  };

  const sendMessage = () => {
    const msg: Message = {
      from: name,
      body: newMessage,
      timestamp: new Date().toISOString(),
    };
    setNewMessage("");
    appendMessages(msg);
    if (socket.current) {
      socket.current.send(JSON.stringify({ type: "message", message: msg }));
    }
  };

  useEffect(() => {
    socket.current = new WebSocket("ws://localhost:8000");
    socket.current.onopen = () => {
      console.log("Open");
    };
    socket.current.onmessage = (m) => {
      console.log("Message:", m.data);
      const msg: WsMessage = JSON.parse(m.data);
      switch (msg.type) {
        case "backlog":
          setMessages(msg.messages);
          break;
        case "message":
          appendMessages(msg.message);
          break;
      }
    };
    socket.current.onclose = () => {
      console.log("Disconnected");
    };
    socket.current.onerror = (e) => {
      console.error("Error:", e);
    };

    const currentSocket = socket.current;

    return () => {
      currentSocket.close();
    };
  }, []);

  return (
    <>
      <p>Name</p>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <hr />
      <input
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={() => sendMessage()}>Send</button>
      <div>
        {messages.map((msg) => (
          <p>
            <small>
              {msg.timestamp} / <b>{msg.from}</b>
            </small>: {msg.body}
          </p>
        ))}
      </div>
    </>
  );
};

const app = document.getElementById("app");
ReactDOM.render(<App />, app);
