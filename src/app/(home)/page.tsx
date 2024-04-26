import { PageClient } from "@/app/(home)/page-client";
import { generateId } from "@/lib/utils";

export default function Page() {
  const id = generateId();

  return <PageClient id={id} />;
}
