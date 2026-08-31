import { SpiderPresence } from "@/components/hxh/spider-presence";
import type { ReactNode } from "react";

export default function OperationsLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactNode {
  return (
    <>
      <SpiderPresence />
      {children}
    </>
  );
}