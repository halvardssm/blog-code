import { Message, WsMessage } from "./shared.ts";

const messages: Message[] = [];
const participants = new Map<number, WebSocket>();
let participantId = 1;

Deno.serve(
  { port: 8000 },
  (req) => {
    const { socket, response } = Deno.upgradeWebSocket(req);
    const socketId = participantId++;

    socket.onopen = () => {
      participants.set(socketId, socket);
      console.log(
        `Participant ${socketId} has entered. Current participants: ${participants.size}`,
      );
      socket.send(JSON.stringify(<WsMessage> { type: "backlog", messages }));
    };

    socket.onmessage = (e) => {
      console.log(`Message received from participant ${socketId}:`, e.data);
      const msg: WsMessage = JSON.parse(e.data);
      if (msg.type === "message") {
        messages.push(msg.message);
        participants.delete(socketId);
        participants.forEach((ws) => {
          ws.send(e.data);
        });
      }
    };

    socket.onclose = () => {
      participants.delete(socketId);
      console.log(
        `Participant ${socketId} has left. Current participants: ${participants.size}`,
      );
    };

    socket.onerror = (e) => {
      participants.delete(socketId);
      console.error("WebSocket error:", e);
    };

    return response;
  },
);
