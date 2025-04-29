import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navbar />
      {/* Add top padding equal to navbar height (e.g., 64px = 16 * 4) */}
      <main className="">{children}</main>
    </div>
  );
}
