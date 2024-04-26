import { PageClient } from "@/app/(home)/page-client";
import { generateId } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat Playground using WebSocket",
  description: "Chat Playground using WebSocket",
};

export default function Page() {
  const id = generateId();

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto">
        <PageClient id={id} />
      </div>
    </div>
  );
}
