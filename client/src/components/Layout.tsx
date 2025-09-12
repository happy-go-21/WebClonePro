import { ReactNode } from "react";
import TopToolsBar from "@/components/TopToolsBar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen p-5">
      <TopToolsBar />
      <main className="max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
}
