"use client";

import { JoinMessage, MyMessage, TheirMessage } from "@/components/chat";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Chat, Join } from "@/lib/type";
import { getInitials } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5331"); // Replace with your server URL

interface PageClientProps {
  id: string;
}

export const PageClient = ({ id }: PageClientProps) => {
  const [tempName, setTempName] = useState("");
  const [name, setName] = useState<string | null>(null);

  const [newMessages, setNewMessages] = useState<string>("");

  const [data, setData] = useState<Array<Join | Chat>>([]);

  useEffect(() => {
    socket.on("message", (message: Chat) => {
      setData((prev) => [...prev, message]);
    });
  }, []);

  const sendMessage = () => {
    socket.emit("message", { id, name, message: newMessages, type: "chat" });
    setNewMessages("");
  };

  const sendJoin = () => {
    socket.emit("message", { name: tempName, id, type: "join" });
  };

  if (!name) {
    return (
      <div className=" flex min-h-screen w-full max-w-[800px] flex-col rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
        <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-800">
          <h2 className="text-lg font-medium">Chat</h2>
        </header>
        <div className="flex-1 px-6 py-4">
          <div className="grid gap-4">
            <Input
              className="text-lg"
              placeholder="Enter your name..."
              type="text"
              onChange={(e) => setTempName(e.target.value)}
              data-1p-ignore
            />
            <Button
              className="text-lg"
              disabled={!tempName}
              onClick={() => {
                setName(tempName);
                sendJoin();
              }}
            >
              Join Chat
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full max-w-[800px] flex-col rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-800">
        <h2 className="text-lg font-medium">Chat</h2>
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{getInitials(name)}</AvatarFallback>
          </Avatar>
          <div className="grid gap-0.5 text-sm">
            <div className="font-medium">{name}</div>
            <div className="text-gray-500 dark:text-gray-400">Online</div>
          </div>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="grid gap-4">
          {data.map((item, index) => {
            if (item.type === "join") {
              return (
                <JoinMessage key={`${index}-${item.id}`} join={item as Join} />
              );
            }

            const isMe = item.id === id;

            if (isMe) {
              return (
                <MyMessage key={`${index}-${item.id}`} message={item as Chat} />
              );
            }

            return (
              <TheirMessage
                key={`${index}-${item.id}`}
                message={item as Chat}
              />
            );
          })}
        </div>
      </div>
      <div className="flex items-center gap-2 border-t border-gray-200 px-6 py-4 dark:border-gray-800">
        <Input
          className="flex-1"
          placeholder="Enter your message..."
          type="text"
          disabled={!name}
          onChange={(e) => setNewMessages(e.target.value)}
          value={newMessages}
          data-1p-ignore
        />
        <Button type="submit" onClick={sendMessage}>
          Send
        </Button>
      </div>
    </div>
  );
};
