"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Chat, Join } from "@/lib/type";
import { generateId, getInitials } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001"); // Replace with your server URL

const id = generateId();

const Index = () => {
  const [tempName, setTempName] = useState("");
  const [name, setName] = useState<string | null>(null);

  const [newMessages, setNewMessages] = useState<string>("");

  const [data, setData] = useState<Array<Join | Chat>>([]);

  useEffect(() => {
    socket.on("chat", (message: Chat) => {
      setData((prev) => [...prev, message]);
    });

    socket.on("join", (message: Join) => {
      setData((prev) => [...prev, message]);
    });
  }, []);

  const sendMessage = () => {
    socket.emit("chat", { id, name, message: newMessages });
    setNewMessages("");
  };

  const sendJoin = () => {
    socket.emit("join", { name: tempName, id });
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

  const MyMessage = ({ message }: { message: Chat }) => (
    <div className="flex items-start gap-3 justify-end">
      <div className="space-y-2">
        <div className="rounded-lg bg-gray-900 p-2 text-sm text-gray-50 dark:bg-gray-50 dark:text-gray-900">
          <p className="text-sm font-bold text-gray-50">{message.name}</p>
          <p>{message.message}</p>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {message.time}
        </div>
      </div>
      <Avatar className="h-8 w-8">
        <AvatarImage alt={message.name} src="/placeholder-avatar.jpg" />
        <AvatarFallback>{message.name[0]}</AvatarFallback>
      </Avatar>
    </div>
  );

  const TheirMessage = ({ message }: { message: Chat }) => (
    <div className="flex items-start gap-3">
      <Avatar className="h-8 w-8">
        <AvatarImage alt={message.name} src="/placeholder-avatar.jpg" />
        <AvatarFallback>{message.name[0]}</AvatarFallback>
      </Avatar>
      <div className="space-y-2">
        <div className="rounded-lg bg-gray-100 p-2 text-sm dark:bg-gray-800">
          <p className="text-sm font-bold">{message.name}</p>
          <p>{message.message}</p>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {message.time}
        </div>
      </div>
    </div>
  );

  const JoinMessage = ({ join }: { join: Join }) => {
    return (
      <div className="flex items-center justify-center">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {join.name} joined the chat
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen w-full max-w-[800px] flex-col rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-800">
        <h2 className="text-lg font-medium">Chat</h2>
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
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
          {/* <div className="flex items-start gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
              <AvatarFallback>JP</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <div className="rounded-lg bg-gray-100 p-3 text-sm dark:bg-gray-800">
                <p>Hey there! How's it going?</p>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                10:30 AM
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3 justify-end">
            <div className="space-y-2">
              <div className="rounded-lg bg-gray-900 p-3 text-sm text-gray-50 dark:bg-gray-50 dark:text-gray-900">
                <p>Pretty good, thanks for asking!</p>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                10:31 AM
              </div>
            </div>
            <Avatar className="h-8 w-8">
              <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
              <AvatarFallback>JP</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex items-start gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
              <AvatarFallback>JP</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <div className="rounded-lg bg-gray-100 p-3 text-sm dark:bg-gray-800">
                <p>That's great to hear! I have a question for you.</p>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                10:32 AM
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3 justify-end">
            <div className="space-y-2">
              <div className="rounded-lg bg-gray-900 p-3 text-sm text-gray-50 dark:bg-gray-50 dark:text-gray-900">
                <p>Sure, what's up?</p>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                10:33 AM
              </div>
            </div>
            <Avatar className="h-8 w-8">
              <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
              <AvatarFallback>JP</AvatarFallback>
            </Avatar>
          </div> */}
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
        />
        <Button type="button" onClick={sendMessage}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default Index;
