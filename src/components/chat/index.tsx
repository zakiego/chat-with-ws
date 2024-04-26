import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Chat, Join } from "@/lib/type";

export const JoinMessage = ({ join }: { join: Join }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="text-xs text-gray-500 dark:text-gray-400">
        {join.name} joined the chat
      </div>
    </div>
  );
};

export const TheirMessage = ({ message }: { message: Chat }) => (
  <div className="flex items-start gap-3">
    <Avatar className="h-8 w-8">
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

export const MyMessage = ({ message }: { message: Chat }) => (
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
      <AvatarFallback>{message.name[0]}</AvatarFallback>
    </Avatar>
  </div>
);
