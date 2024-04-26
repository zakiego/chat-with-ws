export type Chat = {
  type: "chat";
  id: string;
  name: string;
  message: string;
  time: string;
};

export type Join = {
  type: "join";
  id: string;
  name: string;
};
