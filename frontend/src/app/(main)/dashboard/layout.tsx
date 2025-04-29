import Sidebar from "@/components/Sidebar";
import { ReactNode } from "react";

export default function AddBlogLayout({
  children,
  sidebar,
}: {
  children: ReactNode;
  sidebar: ReactNode;
}) {
  return (
    <div className="flex h-auto bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto custom-scrollbar">
        {children}
      </main>
    </div>
  );
}
