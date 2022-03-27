export type Message = {
  from: string;
  body: string;
  timestamp: string;
};

export type WsMessage = {
  type: "backlog";
  messages: Message[];
} | {
  type: "message";
  message: Message;
};
